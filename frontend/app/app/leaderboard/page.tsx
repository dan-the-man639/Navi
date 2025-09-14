import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Eye, Flag, TrendingUp, Calendar, Award, ChevronLeft } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Game
              </a>
            </Button>
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Navi Leaderboard</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Game
            </a>
            <a href="/leaderboard" className="text-sm font-medium text-primary">
              Leaderboard
            </a>
            <a href="/database" className="text-sm font-medium hover:text-primary transition-colors">
              Database
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Weekly Champions
                    </CardTitle>
                    <CardDescription>Top performers this week • Prize pool: $2,847.50</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          rank: 1,
                          name: "SearchMaster",
                          points: 4521,
                          completions: 18,
                          avgTime: "1:23",
                          prize: "$452.10",
                          badge: "🥇",
                          avatar: "SM",
                          verified: 17,
                          reported: 1,
                        },
                        {
                          rank: 2,
                          name: "DataHunter",
                          points: 4298,
                          completions: 16,
                          avgTime: "2:15",
                          prize: "$429.80",
                          badge: "🥈",
                          avatar: "DH",
                          verified: 16,
                          reported: 0,
                        },
                        {
                          rank: 3,
                          name: "InfoNinja",
                          points: 4087,
                          completions: 15,
                          avgTime: "1:45",
                          prize: "$408.70",
                          badge: "🥉",
                          avatar: "IN",
                          verified: 14,
                          reported: 1,
                        },
                        {
                          rank: 4,
                          name: "ResearchPro",
                          points: 3876,
                          completions: 14,
                          avgTime: "3:02",
                          prize: "$387.60",
                          badge: "",
                          avatar: "RP",
                          verified: 13,
                          reported: 1,
                        },
                        {
                          rank: 5,
                          name: "FactFinder",
                          points: 3654,
                          completions: 13,
                          avgTime: "2:34",
                          prize: "$365.40",
                          badge: "",
                          avatar: "FF",
                          verified: 12,
                          reported: 1,
                        },
                        {
                          rank: 6,
                          name: "QuickSeeker",
                          points: 3432,
                          completions: 12,
                          avgTime: "1:58",
                          prize: "$343.20",
                          badge: "",
                          avatar: "QS",
                          verified: 11,
                          reported: 1,
                        },
                        {
                          rank: 7,
                          name: "WebWizard",
                          points: 3210,
                          completions: 11,
                          avgTime: "2:45",
                          prize: "$321.00",
                          badge: "",
                          avatar: "WW",
                          verified: 10,
                          reported: 1,
                        },
                        {
                          rank: 8,
                          name: "TaskTitan",
                          points: 2988,
                          completions: 10,
                          avgTime: "3:12",
                          prize: "$298.80",
                          badge: "",
                          avatar: "TT",
                          verified: 9,
                          reported: 1,
                        },
                      ].map((player) => (
                        <div
                          key={player.rank}
                          className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                            player.rank <= 3
                              ? "bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20"
                              : "bg-muted/30 hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold">
                              {player.badge || player.rank}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{player.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-lg">{player.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {player.completions} completions • Avg: {player.avgTime}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  ✓ {player.verified} verified
                                </Badge>
                                {player.reported > 0 && (
                                  <Badge variant="destructive" className="text-xs">
                                    ⚠ {player.reported} reported
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Videos
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Flag className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                            <div className="text-right">
                              <div className="font-bold text-xl text-primary">{player.points.toLocaleString()}</div>
                              <div className="text-sm text-green-600 font-semibold">{player.prize}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">🌐 Wikipedia Masters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "InfoNinja", points: 1250, time: "1:23" },
                          { name: "FactFinder", points: 1180, time: "1:45" },
                          { name: "SearchMaster", points: 1120, time: "2:01" },
                        ].map((player, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="font-medium">
                              {i + 1}. {player.name}
                            </span>
                            <div className="text-right text-sm">
                              <div>{player.points} pts</div>
                              <div className="text-muted-foreground">{player.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">🛒 Amazon Experts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "SearchMaster", points: 980, time: "2:15" },
                          { name: "DataHunter", points: 920, time: "2:34" },
                          { name: "QuickSeeker", points: 890, time: "1:58" },
                        ].map((player, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="font-medium">
                              {i + 1}. {player.name}
                            </span>
                            <div className="text-right text-sm">
                              <div>{player.points} pts</div>
                              <div className="text-muted-foreground">{player.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">🔍 Research Champions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "ResearchPro", points: 1450, time: "3:02" },
                          { name: "DataHunter", points: 1380, time: "2:45" },
                          { name: "WebWizard", points: 1320, time: "3:15" },
                        ].map((player, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="font-medium">
                              {i + 1}. {player.name}
                            </span>
                            <div className="text-right text-sm">
                              <div>{player.points} pts</div>
                              <div className="text-muted-foreground">{player.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">⚡ Speed Demons</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "SearchMaster", points: 850, time: "0:45" },
                          { name: "QuickSeeker", points: 820, time: "0:52" },
                          { name: "InfoNinja", points: 790, time: "1:01" },
                        ].map((player, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="font-medium">
                              {i + 1}. {player.name}
                            </span>
                            <div className="text-right text-sm">
                              <div>{player.points} pts</div>
                              <div className="text-muted-foreground">{player.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Players</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="font-bold">8,934</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prize Pool</span>
                  <span className="font-bold text-green-600">$8,934.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Completion</span>
                  <span className="font-bold">2:34</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-bold">73%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">🏆</div>
                  <div>
                    <p className="text-sm font-medium">Perfect Week</p>
                    <p className="text-xs text-muted-foreground">SearchMaster • 18/18 tasks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">⚡</div>
                  <div>
                    <p className="text-sm font-medium">Lightning Fast</p>
                    <p className="text-xs text-muted-foreground">QuickSeeker • 0:45 record</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">🎯</div>
                  <div>
                    <p className="text-sm font-medium">Category Master</p>
                    <p className="text-xs text-muted-foreground">InfoNinja • Wikipedia expert</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Next Reset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2d 14h 23m</div>
                  <p className="text-sm text-muted-foreground mt-1">Weekly leaderboard resets every Sunday</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
