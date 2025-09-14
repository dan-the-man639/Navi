import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Target,
  Clock,
  Star,
  Search,
  ShoppingCart,
  Globe,
  CheckCircle,
  Timer,
  TrendingUp,
  Video,
  Square,
  Gift,
  PlayCircle,
  StopCircle,
} from "lucide-react"

export default function TaskGameInterface() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Navi</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Game
            </a>
            <a href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="/database" className="text-sm font-medium hover:text-primary transition-colors">
              Database
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">2,847</span>
                <span className="text-muted-foreground">points</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold">#23</span>
                <span className="text-muted-foreground">rank</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="h-4 w-4 text-green-500" />
                <span className="font-semibold">$12.50</span>
                <span className="text-muted-foreground">earned</span>
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Current Challenge */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Video className="h-5 w-5 text-red-500 animate-pulse" />
                    Recording Active
                  </CardTitle>
                  <CardDescription>Find a specific Wikipedia page</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    <StopCircle className="h-3 w-3 mr-1" />
                    REC 02:34
                  </Badge>
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    <Timer className="h-3 w-3 mr-1" />
                    12:26 left
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg font-medium">
                  Find the Wikipedia page for a 1987 movie that features time travel and was filmed in California
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Wikipedia Challenge
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    250 points
                  </span>
                  <span className="flex items-center gap-1">
                    <Gift className="h-4 w-4 text-green-500" />
                    $2.50 prize
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    15 min limit
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finish Challenge
                  </Button>
                  <Button variant="outline" className="bg-red-50 hover:bg-red-100 text-red-600">
                    <Square className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Available Tasks</CardTitle>
              <CardDescription>Choose your next challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                      <Badge variant="outline">Amazon</Badge>
                    </div>
                    <CardTitle className="text-lg">Product Detective</CardTitle>
                    <CardDescription>
                      Find a kitchen gadget under $25 with over 1000 reviews and 4.5+ stars
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        10 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        180 pts
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="h-4 w-4 text-green-500" />
                        $1.80
                      </span>
                    </div>
                    <Button className="w-full" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Search className="h-6 w-6 text-primary" />
                      <Badge variant="outline">Research</Badge>
                    </div>
                    <CardTitle className="text-lg">Data Sleuth</CardTitle>
                    <CardDescription>
                      Find the population of the 3rd largest city in a EU country that joined in 2004
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        20 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        350 pts
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="h-4 w-4 text-green-500" />
                        $3.50
                      </span>
                    </div>
                    <Button className="w-full" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Globe className="h-6 w-6 text-primary" />
                      <Badge variant="outline">Wikipedia</Badge>
                    </div>
                    <CardTitle className="text-lg">History Hunter</CardTitle>
                    <CardDescription>Find the Wikipedia page for a battle that took place in 1066</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />8 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        120 pts
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="h-4 w-4 text-green-500" />
                        $1.20
                      </span>
                    </div>
                    <Button className="w-full" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <Badge variant="outline">Finance</Badge>
                    </div>
                    <CardTitle className="text-lg">Market Finder</CardTitle>
                    <CardDescription>Find a stock that gained more than 50% in the last year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        15 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        280 pts
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="h-4 w-4 text-green-500" />
                        $2.80
                      </span>
                    </div>
                    <Button className="w-full" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Completions</CardTitle>
              <CardDescription>Your latest challenge attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Movie Time Travel Hunt</p>
                      <p className="text-sm text-muted-foreground">Found: Back to the Future • 2:34 completion time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+250 pts</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Population Detective</p>
                      <p className="text-sm text-muted-foreground">Found: Kraków, Poland • 8:12 completion time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+350 pts</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
