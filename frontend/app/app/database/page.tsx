import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Target,
  Clock,
  Star,
  Search,
  Eye,
  Flag,
  Filter,
  Download,
  Play,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Calendar,
  Timer,
  TrendingUp,
} from "lucide-react"

export default function DatabasePage() {
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
              <h1 className="text-2xl font-bold text-foreground">Task Database</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Game
            </a>
            <a href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="/database" className="text-sm font-medium text-primary">
              Database
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Database View */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Task Attempts
                </CardTitle>
                <CardDescription>Browse all task completion videos and metadata</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Search by task, user, or keyword..." className="flex-1" />
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">All Tasks</Badge>
                  <Badge variant="outline">Wikipedia</Badge>
                  <Badge variant="outline">Amazon</Badge>
                  <Badge variant="outline">Research</Badge>
                  <Badge variant="outline">Completed</Badge>
                  <Badge variant="outline">Failed</Badge>
                  <Badge variant="outline">Reported</Badge>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Attempts</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="reported">Reported</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      id: "ATT-2024-001",
                      user: "SearchMaster",
                      avatar: "SM",
                      task: "Find a 1987 movie with time travel filmed in California",
                      category: "Wikipedia",
                      status: "completed",
                      time: "2:34",
                      points: 250,
                      timestamp: "2 hours ago",
                      videoLength: "2:45",
                      reports: 0,
                      verified: true,
                    },
                    {
                      id: "ATT-2024-002",
                      user: "DataHunter",
                      avatar: "DH",
                      task: "Find kitchen gadget under $25 with 1000+ reviews and 4.5+ stars",
                      category: "Amazon",
                      status: "completed",
                      time: "4:12",
                      points: 180,
                      timestamp: "3 hours ago",
                      videoLength: "4:23",
                      reports: 0,
                      verified: true,
                    },
                    {
                      id: "ATT-2024-003",
                      user: "InfoNinja",
                      avatar: "IN",
                      task: "Find population of 3rd largest city in EU country that joined in 2004",
                      category: "Research",
                      status: "completed",
                      time: "8:45",
                      points: 350,
                      timestamp: "5 hours ago",
                      videoLength: "9:01",
                      reports: 1,
                      verified: false,
                    },
                    {
                      id: "ATT-2024-004",
                      user: "QuickSeeker",
                      avatar: "QS",
                      task: "Find a battle that took place in 1066",
                      category: "Wikipedia",
                      status: "failed",
                      time: "15:00",
                      points: 0,
                      timestamp: "6 hours ago",
                      videoLength: "15:00",
                      reports: 0,
                      verified: false,
                    },
                    {
                      id: "ATT-2024-005",
                      user: "ResearchPro",
                      avatar: "RP",
                      task: "Find stock that gained 50%+ in last year",
                      category: "Finance",
                      status: "completed",
                      time: "6:23",
                      points: 280,
                      timestamp: "8 hours ago",
                      videoLength: "6:34",
                      reports: 0,
                      verified: true,
                    },
                    {
                      id: "ATT-2024-006",
                      user: "FactFinder",
                      avatar: "FF",
                      task: "Find a 1990s Oscar Best Picture winner",
                      category: "Wikipedia",
                      status: "completed",
                      time: "1:23",
                      points: 500,
                      timestamp: "12 hours ago",
                      videoLength: "1:34",
                      reports: 0,
                      verified: true,
                    },
                  ].map((attempt) => (
                    <Card key={attempt.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{attempt.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{attempt.user}</span>
                                <Badge variant="outline" className="text-xs">
                                  {attempt.id}
                                </Badge>
                                <Badge
                                  variant={
                                    attempt.category === "Wikipedia"
                                      ? "default"
                                      : attempt.category === "Amazon"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {attempt.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{attempt.task}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {attempt.timestamp}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Timer className="h-3 w-3" />
                                  {attempt.time} completion
                                </span>
                                <span className="flex items-center gap-1">
                                  <Play className="h-3 w-3" />
                                  {attempt.videoLength} video
                                </span>
                                {attempt.reports > 0 && (
                                  <span className="flex items-center gap-1 text-red-600">
                                    <Flag className="h-3 w-3" />
                                    {attempt.reports} reports
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {attempt.status === "completed" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <div className="text-right">
                              <div className="font-semibold text-primary">
                                {attempt.points > 0 ? `+${attempt.points}` : "0"} pts
                              </div>
                              {attempt.verified && (
                                <Badge variant="outline" className="text-xs text-green-600">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Watch Video
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Flag className="h-4 w-4 mr-2" />
                            Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Task Completion Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Wikipedia Tasks</span>
                          <span className="font-semibold">78%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Amazon Tasks</span>
                          <span className="font-semibold">65%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Research Tasks</span>
                          <span className="font-semibold">52%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Finance Tasks</span>
                          <span className="font-semibold">71%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Average Completion Times</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Wikipedia Tasks</span>
                          <span className="font-semibold">2:34</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Amazon Tasks</span>
                          <span className="font-semibold">4:12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Research Tasks</span>
                          <span className="font-semibold">8:45</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Finance Tasks</span>
                          <span className="font-semibold">6:23</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Most Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "SearchMaster", attempts: 47 },
                          { name: "DataHunter", attempts: 42 },
                          { name: "InfoNinja", attempts: 38 },
                          { name: "ResearchPro", attempts: 35 },
                        ].map((user, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-sm">{user.attempts} attempts</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Report Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Reports</span>
                          <span className="font-semibold">23</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Verified Invalid</span>
                          <span className="font-semibold text-red-600">8</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">False Reports</span>
                          <span className="font-semibold">15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pending Review</span>
                          <span className="font-semibold text-yellow-600">3</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Database Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Attempts</span>
                  <span className="font-bold">12,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-bold text-green-600">8,934</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Failed</span>
                  <span className="font-bold text-red-600">3,913</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Video Hours</span>
                  <span className="font-bold">847.2h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="font-bold">2.4 TB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Completed Only
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <XCircle className="h-4 w-4 mr-2 text-red-500" />
                  Failed Only
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Flag className="h-4 w-4 mr-2 text-red-600" />
                  Reported
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Last 24h
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  High Points
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">SearchMaster</div>
                  <div className="text-muted-foreground">Completed Wikipedia task • 2m ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">DataHunter</div>
                  <div className="text-muted-foreground">Started Amazon task • 5m ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">InfoNinja</div>
                  <div className="text-muted-foreground">Video reported • 12m ago</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
