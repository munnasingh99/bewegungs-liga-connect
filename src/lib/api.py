from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from user_analytics import UserAnalytics
import plotly.io as pio
import numpy as np
import math
from typing import Dict, Any

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize analytics
analytics = UserAnalytics()

def to_native(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {k: to_native(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [to_native(v) for v in obj]
    elif isinstance(obj, (np.integer, np.int64)):
        return int(obj)
    elif isinstance(obj, (np.floating, np.float64)):
        if math.isnan(obj):
            return None
        return float(obj)
    elif isinstance(obj, float):
        if math.isnan(obj):
            return None
        return obj
    elif isinstance(obj, (np.ndarray,)):
        return obj.tolist()
    elif obj is None:
        return None
    elif isinstance(obj, str):
        return obj
    # Handle pandas/NumPy NaN
    elif obj != obj:  # NaN is not equal to itself
        return None
    else:
        return obj

def handle_error(e: Exception, status_code: int = 500) -> HTTPException:
    """Consistent error handling across all endpoints"""
    error_detail = str(e)
    print(f"[ERROR] {error_detail}")
    return HTTPException(status_code=status_code, detail=error_detail)

@app.get("/api/user/{user_id}/dashboard")
async def get_user_dashboard(user_id: str) -> Dict[str, Any]:
    print(f"[DEBUG] /api/user/{user_id}/dashboard endpoint called")
    try:
        # Get user profile
        profile = analytics.get_user_profile(user_id)
        profile = to_native(profile)  # convert to native types
        
        # Create dashboard figure
        fig = analytics.create_user_dashboard(user_id)
        
        # Convert figure to JSON
        fig_json = json.loads(pio.to_json(fig))
        
        return {
            "profile": profile,
            "dashboard": fig_json
        }
    except Exception as e:
        raise handle_error(e)

@app.get("/api/user/{user_id}/progress")
async def get_user_progress(user_id: str) -> Dict[str, Any]:
    try:
        progress = analytics.track_weekly_progress(user_id)
        return to_native(progress)
    except Exception as e:
        raise handle_error(e, status_code=404)

@app.get("/api/user/{user_id}/similar")
async def get_similar_users(user_id: str) -> Dict[str, Any]:
    try:
        similar = analytics.compare_with_similar_users(user_id)
        return to_native(similar)
    except Exception as e:
        raise handle_error(e, status_code=404) 