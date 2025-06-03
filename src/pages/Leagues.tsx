
import React, { useState } from 'react';
import { Plus, Users, Share } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { LeagueCard } from '../components/leagues/LeagueCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';
import { League } from '../types';
import { toast } from '../components/ui/use-toast';

export const Leagues: React.FC = () => {
  const { leagues, joinLeague, createLeague } = useApp();
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [leagueName, setLeagueName] = useState('');

  const handleJoinLeague = () => {
    if (joinCode.trim()) {
      const success = joinLeague(joinCode.trim());
      if (success) {
        toast({
          title: "League Joined! 🎉",
          description: "You've successfully joined the league",
        });
        setJoinCode('');
        setShowJoinForm(false);
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check the league code and try again",
          variant: "destructive"
        });
      }
    }
  };

  const handleCreateLeague = () => {
    if (leagueName.trim()) {
      const code = createLeague(leagueName.trim());
      toast({
        title: "League Created! 🎊",
        description: `Your league code is: ${code}`,
      });
      setLeagueName('');
      setShowCreateForm(false);
    }
  };

  const handleViewLeagueDetails = (league: League) => {
    // TODO: Navigate to league details page
    console.log('View league details:', league);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Leagues" />
      
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header actions */}
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowJoinForm(!showJoinForm)}
            variant="outline"
            className="flex-1"
          >
            <Users className="w-4 h-4 mr-2" />
            Join League
          </Button>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create League
          </Button>
        </div>

        {/* Join league form */}
        {showJoinForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Join a League</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter league code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="text-center font-mono text-lg"
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowJoinForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleJoinLeague}
                  disabled={!joinCode.trim()}
                  className="flex-1"
                >
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create league form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create a League</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="League name"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateLeague}
                  disabled={!leagueName.trim()}
                  className="flex-1"
                >
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* My leagues */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Leagues</h2>
          {leagues.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">No Leagues Yet</h3>
              <p className="text-gray-600 text-sm mb-4">
                Join or create a league to compete with friends and family
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                size="sm"
              >
                Create Your First League
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {leagues.map((league) => (
                <LeagueCard
                  key={league.id}
                  league={league}
                  onViewDetails={handleViewLeagueDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
};
