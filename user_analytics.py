#!/usr/bin/env python3
"""
Individual User Analytics and Tracking
Provides personalized insights, progress tracking, and visualizations for individual users
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class UserAnalytics:
    def __init__(self):
        """Initialize with dataset loading"""
        self.load_datasets()
        self.prepare_master_dataset()
    
    def load_datasets(self):
        """Load all CSV datasets"""
        try:
            self.demo_df = pd.read_csv('users_demographic.csv')
            self.physical_df = pd.read_csv('users_physical.csv')
            self.activity_df = pd.read_csv('users_activity_weekly.csv')
            self.insurance_df = pd.read_csv('insurance_providers.csv')
            self.services_df = pd.read_csv('insurance_services.csv')
            print("✅ All datasets loaded successfully")
        except FileNotFoundError as e:
            print(f"❌ Error loading datasets: {e}")
            raise
    
    def prepare_master_dataset(self):
        """Combine all datasets and clean for analysis"""
        # Merge user data
        self.master_df = self.demo_df.merge(self.physical_df, on='user_id', how='inner')
        self.master_df = self.master_df.merge(self.activity_df, on='user_id', how='inner')
        
        # Debug print: show first 10 user_ids after merge
        print("[DEBUG] First 10 user_ids in master_df after merge:")
        print(self.master_df['user_id'].head(10).tolist())
        
        # Add insurance provider details
        insurance_mapping = self.insurance_df.set_index('provider_name')['provider_id'].to_dict()
        self.master_df['provider_id'] = self.master_df['current_insurance_provider'].map(insurance_mapping)
        
        # Encode categorical variables
        self.master_df['fitness_level_encoded'] = self.master_df['fitness_level'].map({
            'Beginner': 0, 'Intermediate': 1, 'Advanced': 2
        })
        
        self.master_df['gender_encoded'] = self.master_df['gender'].map({'Male': 0, 'Female': 1})
        
        # Calculate additional metrics
        self.master_df['steps_per_day'] = self.master_df['total_steps'] / 7
        self.master_df['calories_per_day'] = self.master_df['total_calories_burned'] / 7
        self.master_df['activity_efficiency'] = self.master_df['total_calories_burned'] / self.master_df['total_active_minutes']
        self.master_df['health_score'] = self._calculate_health_score()
        
        print(f"✅ Master dataset prepared: {len(self.master_df)} users, {len(self.master_df.columns)} features")
    
    def _calculate_health_score(self):
        """Calculate a composite health score (0-100)"""
        scores = []
        for _, user in self.master_df.iterrows():
            score = 50  # Base score
            
            # BMI score (18.5-25 is optimal)
            if 18.5 <= user['bmi'] <= 25:
                score += 15
            elif 25 < user['bmi'] <= 30:
                score += 5
            else:
                score -= 10
            
            # Activity score
            if user['total_steps'] > 70000:  # 10k+ steps/day
                score += 15
            elif user['total_steps'] > 49000:  # 7k+ steps/day
                score += 10
            else:
                score += 5
            
            # Sleep score
            if 7 <= user['sleep_hours_avg'] <= 9:
                score += 10
            else:
                score += 5
            
            # Exercise frequency
            if user['exercise_frequency_per_week'] >= 5:
                score += 10
            elif user['exercise_frequency_per_week'] >= 3:
                score += 5
            
            # Medical conditions penalty
            if user['medical_conditions'] != 'None':
                score -= 5
            
            scores.append(max(0, min(100, score)))
        
        return scores
    
    def get_user_profile(self, user_id):
        """Get comprehensive user profile"""
        print(f"[DEBUG] Searching for user_id: {user_id}")
        user = self.master_df[self.master_df['user_id'] == user_id]
        print(f"[DEBUG] Rows found: {len(user)}")
        if not user.empty:
            print(user.iloc[0].to_dict())
        if user.empty:
            raise ValueError(f"User {user_id} not found")
        
        user_data = user.iloc[0]
        
        profile = {
            'basic_info': {
                'name': f"{user_data['first_name']} {user_data['last_name']}",
                'age': user_data['age'],
                'gender': user_data['gender'],
                'city': user_data['city'],
                'occupation': user_data['occupation']
            },
            'health_metrics': {
                'bmi': user_data['bmi'],
                'fitness_level': user_data['fitness_level'],
                'health_score': user_data['health_score'],
                'resting_hr': user_data['resting_heart_rate'],
                'blood_pressure': f"{user_data['blood_pressure_systolic']}/{user_data['blood_pressure_diastolic']}"
            },
            'activity_summary': {
                'weekly_steps': user_data['total_steps'],
                'daily_avg_steps': user_data['steps_per_day'],
                'weekly_calories': user_data['total_calories_burned'],
                'exercise_sessions': user_data['exercise_sessions'],
                'workout_types': user_data['workout_types']
            },
            'insurance_info': {
                'provider': user_data['current_insurance_provider'],
                'provider_id': user_data['provider_id']
            }
        }
        
        return profile
    
    def create_user_dashboard(self, user_id, save_path=None):
        """Create comprehensive user dashboard with enhanced styling"""
        user_profile = self.get_user_profile(user_id)
        user_data = self.master_df[self.master_df['user_id'] == user_id].iloc[0]
        
        # Create subplot figure with custom styling
        fig = make_subplots(
            rows=3, cols=2,
            subplot_titles=[
                '🏃 Weekly Activity Overview', '💓 Health Score',
                '📊 Activity vs Peers', '❤️ Heart Rate Analysis',
                '😴 Sleep & Recovery', '📈 Fitness Progress'
            ],
            specs=[[{"type": "bar"}, {"type": "indicator"}],
                   [{"type": "scatter"}, {"type": "bar"}],
                   [{"type": "bar"}, {"type": "scatter"}]],
            vertical_spacing=0.12,
            horizontal_spacing=0.1
        )
        
        # Custom color palette
        colors = {
            'primary': '#2563eb',  # Blue
            'secondary': '#16a34a',  # Green
            'accent': '#f59e0b',  # Gold
            'danger': '#dc2626',  # Red
            'success': '#22c55e',  # Light Green
            'background': '#f8fafc'  # Light Gray
        }
        
        # 1. Weekly Activity Overview
        activities = ['Steps', 'Calories', 'Active Min', 'Sessions']
        values = [user_data['total_steps']/1000, user_data['total_calories_burned']/10, 
                 user_data['total_active_minutes'], user_data['exercise_sessions']*10]
        
        fig.add_trace(
            go.Bar(
                x=activities,
                y=values,
                name="Activity",
                marker_color=colors['primary'],
                text=[f"{v:,.0f}" for v in values],
                textposition='auto',
                hovertemplate="%{x}: %{y:,.0f}<extra></extra>"
            ),
            row=1, col=1
        )
        
        # 2. Health Score Gauge
        fig.add_trace(
            go.Indicator(
                mode="gauge+number+delta",
                value=user_data['health_score'],
                domain={'x': [0, 1], 'y': [0, 1]},
                title={'text': "Health Score", 'font': {'size': 24, 'color': colors['primary']}},
                gauge={
                    'axis': {'range': [None, 100], 'tickwidth': 1, 'tickcolor': colors['primary']},
                    'bar': {'color': colors['primary']},
                    'bgcolor': "white",
                    'borderwidth': 2,
                    'bordercolor': colors['primary'],
                    'steps': [
                        {'range': [0, 50], 'color': colors['danger']},
                        {'range': [50, 80], 'color': colors['accent']},
                        {'range': [80, 100], 'color': colors['success']}
                    ],
                    'threshold': {
                        'line': {'color': colors['primary'], 'width': 4},
                        'thickness': 0.75,
                        'value': 90
                    }
                },
                number={'font': {'size': 28, 'color': colors['primary']}}
            ),
            row=1, col=2
        )
        
        # 3. Activity vs Peers
        peers = self.master_df[self.master_df['fitness_level'] == user_data['fitness_level']]
        
        fig.add_trace(
            go.Scatter(
                x=peers['total_steps'],
                y=peers['total_calories_burned'],
                mode='markers',
                name='Peers',
                marker=dict(
                    color=colors['secondary'],
                    size=8,
                    opacity=0.6
                ),
                hovertemplate="Steps: %{x:,.0f}<br>Calories: %{y:,.0f}<extra></extra>"
            ),
            row=2, col=1
        )
        
        fig.add_trace(
            go.Scatter(
                x=[user_data['total_steps']],
                y=[user_data['total_calories_burned']],
                mode='markers',
                name='You',
                marker=dict(
                    color=colors['primary'],
                    size=15,
                    symbol='star',
                    line=dict(color='white', width=2)
                ),
                hovertemplate="Your Activity:<br>Steps: %{x:,.0f}<br>Calories: %{y:,.0f}<extra></extra>"
            ),
            row=2, col=1
        )
        
        # 4. Heart Rate Analysis
        hr_data = ['Resting', 'Average', 'Max']
        hr_values = [user_data['resting_heart_rate'], user_data['avg_heart_rate'], user_data['max_heart_rate']]
        
        fig.add_trace(
            go.Bar(
                x=hr_data,
                y=hr_values,
                name="Heart Rate",
                marker_color=[colors['success'], colors['accent'], colors['danger']],
                text=[f"{v} bpm" for v in hr_values],
                textposition='auto',
                hovertemplate="%{x}: %{y} bpm<extra></extra>"
            ),
            row=2, col=2
        )
        
        # 5. Sleep & Recovery
        sleep_data = ['Sleep Hours', 'Target Hours']
        sleep_values = [user_data['sleep_hours_total']/7, 8]  # Daily average vs target
        
        fig.add_trace(
            go.Bar(
                x=sleep_data,
                y=sleep_values,
                name="Sleep",
                marker_color=[colors['primary'], colors['secondary']],
                text=[f"{v:.1f}h" for v in sleep_values],
                textposition='auto',
                hovertemplate="%{x}: %{y:.1f}h<extra></extra>"
            ),
            row=3, col=1
        )
        
        # 6. Fitness Progress
        weeks = list(range(1, 13))
        progress = [user_data['health_score'] - 20 + i*2 + np.random.normal(0, 3) for i in weeks]
        
        fig.add_trace(
            go.Scatter(
                x=weeks,
                y=progress,
                mode='lines+markers',
                name="Health Score Trend",
                line=dict(color=colors['primary'], width=3),
                marker=dict(
                    color=colors['primary'],
                    size=8,
                    line=dict(color='white', width=2)
                ),
                hovertemplate="Week %{x}: %{y:.1f}<extra></extra>"
            ),
            row=3, col=2
        )
        
        # Update layout with enhanced styling
        fig.update_layout(
            title={
                'text': f"Personal Fitness Dashboard - {user_profile['basic_info']['name']}",
                'y': 0.95,
                'x': 0.5,
                'xanchor': 'center',
                'yanchor': 'top',
                'font': {'size': 28, 'color': colors['primary']}
            },
            showlegend=False,
            height=1000,
            template="plotly_white",
            paper_bgcolor=colors['background'],
            plot_bgcolor=colors['background'],
            font=dict(
                family="Inter, sans-serif",
                size=14,
                color="#1f2937"
            ),
            margin=dict(t=100, b=50, l=50, r=50),
            hovermode='closest',
            hoverlabel=dict(
                bgcolor="white",
                font_size=14,
                font_family="Inter, sans-serif"
            )
        )
        
        # Update axes and subplot titles
        for i in range(1, 7):
            fig.update_xaxes(
                showgrid=True,
                gridwidth=1,
                gridcolor='#e5e7eb',
                zeroline=False,
                row=(i-1)//2 + 1,
                col=(i-1)%2 + 1
            )
            fig.update_yaxes(
                showgrid=True,
                gridwidth=1,
                gridcolor='#e5e7eb',
                zeroline=False,
                row=(i-1)//2 + 1,
                col=(i-1)%2 + 1
            )
        
        # Add animations
        fig.update_layout(
            updatemenus=[
                dict(
                    type="buttons",
                    showactive=False,
                    buttons=[
                        dict(
                            label="Play",
                            method="animate",
                            args=[None, {"frame": {"duration": 500, "redraw": True}, "fromcurrent": True}]
                        )
                    ],
                    direction="left",
                    pad={"r": 10, "t": 10},
                    x=0.1,
                    y=0,
                    xanchor="right",
                    yanchor="top"
                )
            ]
        )
        
        if save_path:
            fig.write_html(save_path)
        
        return fig
    
    def track_weekly_progress(self, user_id, weeks_data=None):
        """Track user progress over multiple weeks"""
        if weeks_data is None:
            # Generate sample weekly data for demonstration
            weeks_data = self._generate_sample_weekly_data(user_id)
        
        user_profile = self.get_user_profile(user_id)
        
        # Create progress tracking chart
        fig = go.Figure()
        
        weeks = list(range(1, len(weeks_data) + 1))
        
        # Add multiple metrics
        fig.add_trace(go.Scatter(
            x=weeks,
            y=[w['total_steps']/1000 for w in weeks_data],
            mode='lines+markers',
            name='Steps (thousands)',
            line=dict(color='blue')
        ))
        
        fig.add_trace(go.Scatter(
            x=weeks,
            y=[w['total_calories_burned']/100 for w in weeks_data],
            mode='lines+markers',
            name='Calories (hundreds)',
            line=dict(color='red')
        ))
        
        fig.add_trace(go.Scatter(
            x=weeks,
            y=[w['exercise_sessions']*10 for w in weeks_data],
            mode='lines+markers',
            name='Sessions (x10)',
            line=dict(color='green')
        ))
        
        fig.update_layout(
            title=f"Weekly Progress Tracking - {user_profile['basic_info']['name']}",
            xaxis_title="Week",
            yaxis_title="Activity Level",
            template="plotly_white"
        )
        
        fig.show()
        
        # Calculate progress metrics
        if len(weeks_data) >= 2:
            latest_week = weeks_data[-1]
            previous_week = weeks_data[-2]
            
            progress_metrics = {
                'steps_change': latest_week['total_steps'] - previous_week['total_steps'],
                'calories_change': latest_week['total_calories_burned'] - previous_week['total_calories_burned'],
                'sessions_change': latest_week['exercise_sessions'] - previous_week['exercise_sessions']
            }
            
            print("\n📊 Weekly Progress Summary:")
            print(f"Steps: {progress_metrics['steps_change']:+,}")
            print(f"Calories: {progress_metrics['calories_change']:+,}")
            print(f"Sessions: {progress_metrics['sessions_change']:+}")
        
        return weeks_data
    
    def _generate_sample_weekly_data(self, user_id, num_weeks=8):
        """Generate sample weekly progression data"""
        user_data = self.master_df[self.master_df['user_id'] == user_id].iloc[0]
        
        weeks_data = []
        base_steps = user_data['total_steps']
        base_calories = user_data['total_calories_burned']
        base_sessions = user_data['exercise_sessions']
        
        for week in range(num_weeks):
            # Add some progression and random variation
            progression_factor = 1 + (week * 0.02)  # 2% improvement per week
            noise_factor = np.random.normal(1, 0.1)  # 10% random variation
            
            week_data = {
                'total_steps': int(base_steps * progression_factor * noise_factor),
                'total_calories_burned': int(base_calories * progression_factor * noise_factor),
                'exercise_sessions': max(1, int(base_sessions * progression_factor * noise_factor))
            }
            weeks_data.append(week_data)
        
        return weeks_data
    
    def compare_with_similar_users(self, user_id, top_n=5):
        """Compare user with similar users in their fitness level"""
        user_data = self.master_df[self.master_df['user_id'] == user_id].iloc[0]
        user_profile = self.get_user_profile(user_id)
        
        # Find similar users (same fitness level, similar age)
        similar_users = self.master_df[
            (self.master_df['fitness_level'] == user_data['fitness_level']) &
            (abs(self.master_df['age'] - user_data['age']) <= 5) &
            (self.master_df['user_id'] != user_id)
        ].head(top_n)
        
        # Create comparison chart
        fig, axes = plt.subplots(2, 2, figsize=(12, 10))
        fig.suptitle(f"Comparison with Similar Users - {user_profile['basic_info']['name']}")
        
        metrics = ['total_steps', 'total_calories_burned', 'total_active_minutes', 'health_score']
        titles = ['Weekly Steps', 'Weekly Calories', 'Active Minutes', 'Health Score']
        
        for i, (metric, title) in enumerate(zip(metrics, titles)):
            ax = axes[i//2, i%2]
            
            # Plot similar users
            similar_values = similar_users[metric].values
            user_value = user_data[metric]
            
            ax.bar(range(len(similar_values)), similar_values, alpha=0.7, label='Similar Users')
            ax.axhline(y=user_value, color='red', linestyle='--', linewidth=2, label='You')
            
            ax.set_title(title)
            ax.set_ylabel(metric.replace('_', ' ').title())
            ax.legend()
        
        plt.tight_layout()
        plt.show()
        
        # Print comparison summary
        print(f"\n🤝 Comparison with {len(similar_users)} similar users:")
        for metric, title in zip(metrics, titles):
            user_value = user_data[metric]
            similar_avg = similar_users[metric].mean()
            percentile = (similar_users[metric] < user_value).mean() * 100
            
            print(f"{title}: {user_value:.0f} (vs avg {similar_avg:.0f}) - {percentile:.0f}th percentile")
    
    def create_goal_tracker(self, user_id, goals=None):
        """Create goal tracking visualization"""
        if goals is None:
            # Default goals based on fitness level
            user_data = self.master_df[self.master_df['user_id'] == user_id].iloc[0]
            fitness_level = user_data['fitness_level']
            
            goal_multipliers = {'Beginner': 1.2, 'Intermediate': 1.5, 'Advanced': 1.8}
            multiplier = goal_multipliers[fitness_level]
            
            goals = {
                'weekly_steps': int(50000 * multiplier),
                'weekly_calories': int(2000 * multiplier),
                'exercise_sessions': int(4 * multiplier),
                'sleep_hours': 8 * 7  # Weekly sleep goal
            }
        
        user_data = self.master_df[self.master_df['user_id'] == user_id].iloc[0]
        user_profile = self.get_user_profile(user_id)
        
        # Calculate achievement percentages
        achievements = {
            'Steps': (user_data['total_steps'] / goals['weekly_steps']) * 100,
            'Calories': (user_data['total_calories_burned'] / goals['weekly_calories']) * 100,
            'Sessions': (user_data['exercise_sessions'] / goals['exercise_sessions']) * 100,
            'Sleep': (user_data['sleep_hours_total'] / goals['sleep_hours']) * 100
        }
        
        # Create goal achievement chart
        fig = go.Figure()
        
        for goal, achievement in achievements.items():
            color = 'green' if achievement >= 100 else 'orange' if achievement >= 80 else 'red'
            
            fig.add_trace(go.Bar(
                x=[goal],
                y=[min(achievement, 150)],  # Cap at 150% for visualization
                name=f'{goal} ({achievement:.0f}%)',
                marker_color=color,
                text=f'{achievement:.0f}%',
                textposition='auto'
            ))
        
        # Add 100% goal line
        fig.add_hline(y=100, line_dash="dash", line_color="black", 
                     annotation_text="Goal (100%)")
        
        fig.update_layout(
            title=f"Goal Achievement - {user_profile['basic_info']['name']}",
            xaxis_title="Goal Categories",
            yaxis_title="Achievement Percentage",
            showlegend=False,
            template="plotly_white"
        )
        
        fig.show()
        
        # Print goal summary
        print(f"\n🎯 Goal Achievement Summary:")
        for goal, achievement in achievements.items():
            status = "✅ Achieved" if achievement >= 100 else "⏳ In Progress"
            print(f"{goal}: {achievement:.0f}% {status}")
        
        return achievements
    
    def generate_weekly_report(self, user_id):
        """Generate comprehensive weekly report"""
        user_profile = self.get_user_profile(user_id)
        user_data = self.master_df[self.master_df['user_id'] == user_id].iloc[0]
        
        print(f"\n📋 WEEKLY FITNESS REPORT - {user_profile['basic_info']['name']}")
        print("=" * 60)
        
        # Basic stats
        print(f"🏃 Activity Summary:")
        print(f"  • Total Steps: {user_data['total_steps']:,} ({user_data['steps_per_day']:.0f}/day)")
        print(f"  • Calories Burned: {user_data['total_calories_burned']:,} ({user_data['calories_per_day']:.0f}/day)")
        print(f"  • Exercise Sessions: {user_data['exercise_sessions']}")
        print(f"  • Active Minutes: {user_data['total_active_minutes']}")
        
        print(f"\n💓 Health Metrics:")
        print(f"  • Health Score: {user_data['health_score']:.0f}/100")
        print(f"  • Resting Heart Rate: {user_data['resting_heart_rate']} bpm")
        print(f"  • Average Sleep: {user_data['sleep_hours_total']/7:.1f} hours/night")
        
        print(f"\n🎯 Fitness Level: {user_data['fitness_level']}")
        print(f"💪 Workout Types: {user_data['workout_types']}")
        
        # Recommendations
        print(f"\n💡 Recommendations:")
        if user_data['total_steps'] < 49000:
            print(f"  • Try to increase daily steps (current: {user_data['steps_per_day']:.0f}/day)")
        if user_data['exercise_sessions'] < 3:
            print(f"  • Add more exercise sessions (current: {user_data['exercise_sessions']}/week)")
        if user_data['sleep_hours_total']/7 < 7:
            print(f"  • Focus on getting more sleep (current: {user_data['sleep_hours_total']/7:.1f}h/night)")
        
        print("=" * 60)

# Example usage and testing
def main():
    """Example usage of UserAnalytics"""
    print("🚀 Initializing User Analytics System...")
    
    # Initialize analytics
    analytics = UserAnalytics()
    
    # Example with user USR001
    test_user = "USR001"
    
    print(f"\n👤 Analyzing user: {test_user}")
    
    # Get user profile
    profile = analytics.get_user_profile(test_user)
    print(f"User: {profile['basic_info']['name']}")
    print(f"Fitness Level: {profile['health_metrics']['fitness_level']}")
    
    # Generate weekly report
    analytics.generate_weekly_report(test_user)
    
    # Create visualizations
    print("\n📊 Creating user dashboard...")
    analytics.create_user_dashboard(test_user)
    
    print("\n📈 Tracking weekly progress...")
    analytics.track_weekly_progress(test_user)
    
    print("\n🤝 Comparing with similar users...")
    analytics.compare_with_similar_users(test_user)
    
    print("\n🎯 Checking goal achievement...")
    analytics.create_goal_tracker(test_user)
    
    print("\n✅ User analytics complete!")

if __name__ == "__main__":
    main()