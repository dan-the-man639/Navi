"use client";

import { Button } from "@/components/ui/button";

// CSS for animations
const starAnimation = `
@keyframes starExplosion {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes starFloat {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) rotate(var(--r));
    opacity: 0;
  }
}

.points-container {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.points-value {
  transition: all 0.3s ease;
}

.points-value.animate {
  color: #f59e0b;
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.star-particle {
  position: absolute;
  pointer-events: none;
  animation: starFloat 0.7s ease-out forwards;
  color: #f59e0b;
}
`;
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

export default function TaskGameInterface() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [points, setPoints] = useState(2847); // Starting points from the existing UI
  const [isPointsAnimating, setIsPointsAnimating] = useState(false);
  // Screen recording state
  const screenRecordingRef = useRef<HTMLVideoElement | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [displayMedia, setDisplayMedia] = useState<MediaStreamTrack | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string>("");
  const [screenRecordingChunks, setScreenRecordingChunks] = useState<Blob[]>([]);

  // Start screen recording
  const startScreenRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true, video: true
    });
    const mediaRecorder = new window.MediaRecorder(stream);
    setRecorder(mediaRecorder);
    const videoTrack = stream.getVideoTracks()[0];
    setDisplayMedia(videoTrack);
    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
      if (screenRecordingRef.current) {
        screenRecordingRef.current.src = url;
      }
      if (videoTrack) {
        videoTrack.stop();
      }
    };
    setScreenRecordingChunks(chunks);
    mediaRecorder.start();
    setIsRecording(true);
  };

  // Stop screen recording
  const stopScreenRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    let recordingInterval: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    if (isRecording) {
      // Recording timer
      recordingInterval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Countdown timer
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(countdownInterval);
            clearInterval(recordingInterval);
            setIsRecording(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (recordingInterval) clearInterval(recordingInterval);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [isRecording]);

  // Toggle challenge timer recording (not screen recording)
  const toggleChallengeRecording = () => {
    if (!isRecording) {
      setRecordingTime(0);
      setTimeLeft(15 * 60); // Reset to 15 minutes
    }
    setIsRecording(!isRecording);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Function to create star particles
  const createStarParticles = () => {
    const container = document.querySelector(".points-container");
    if (!container) return;

    // Create 6 stars
    for (let i = 0; i < 6; i++) {
      const star = document.createElement("div");
      star.innerHTML = "⭐";
      star.className = "star-particle text-xs";

      // Random position and rotation
      const angle = (i * 60 + Math.random() * 30) * (Math.PI / 180);
      const distance = 30 + Math.random() * 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rotation = Math.random() * 360;

      star.style.setProperty("--tx", `${tx}px`);
      star.style.setProperty("--ty", `${ty}px`);
      star.style.setProperty("--r", `${rotation}deg`);

      container.appendChild(star);

      // Remove the star after animation
      setTimeout(() => star.remove(), 1000);
    }
  };

  const handleFinishChallenge = () => {
    if (!isRecording) {
      toast({
        title: "Not Recording ⚠️",
        description: "Please start recording before finishing the challenge.",
        variant: "destructive",
        duration: 4000, // Show for 4 seconds
        className: "bg-red-50 border-red-200",
      });
      return;
    }

    // Stop recording and reset timers
    setIsRecording(false);

    // Calculate points based on time taken and remaining time
    const timeBonus = Math.floor((timeLeft / (15 * 60)) * 100);
    const challengePoints = 250 + timeBonus;

    // Update total points and trigger animation
    setPoints((prevPoints) => prevPoints + challengePoints);
    setIsPointsAnimating(true);
    createStarParticles();

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsPointsAnimating(false);
    }, 1000);

    toast({
      title: "Challenge Completed! 🎉",
      description: `You earned ${challengePoints} points! (${timeBonus} time bonus)`,
      variant: "default",
      duration: 5000, // Show for 5 seconds
      className: "bg-green-50 border-green-200",
    });
  };
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
            <a
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Game
            </a>
            <a
              href="/leaderboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Leaderboard
            </a>
            <a
              href="/database"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Database
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <div className="points-container">
                  <span
                    className={`font-semibold points-value ${
                      isPointsAnimating ? "animate" : ""
                    }`}
                  >
                    {points.toLocaleString()}
                  </span>
                </div>
                <span className="text-muted-foreground">points</span>
              </div>
              <style jsx global>
                {starAnimation}
              </style>
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
                    {isRecording && (
                      <Video className="h-5 w-5 text-red-500 animate-pulse" />
                    )}
                    {isRecording ? "Recording Active" : "Challenge Ready"}
                  </CardTitle>
                  <CardDescription>
                    Find a specific Wikipedia page
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isRecording && (
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-700"
                    >
                      <StopCircle className="h-3 w-3 mr-1" />
                      REC {formatTime(recordingTime)}
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                  >
                    <Timer className="h-3 w-3 mr-1" />
                    {formatTime(timeLeft)} left
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg font-medium">
                  Find the Wikipedia page for a 1987 movie that features time
                  travel and was filmed in California
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
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleFinishChallenge}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finish Challenge
                  </Button>
                  <Button
                    variant="outline"
                    className={
                      isRecording
                        ? "bg-red-50 hover:bg-red-100 text-red-600"
                        : "bg-green-50 hover:bg-green-100 text-green-600"
                    }
                    onClick={toggleChallengeRecording}
                  >
                    {isRecording ? (
                      <>
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Recording
                      </>
                    )}
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
                      Find a kitchen gadget under $25 with over 1000 reviews and
                      4.5+ stars
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
                    <Button className="w-full" size="sm" onClick={startScreenRecording}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                    {isRecording && (
                      <Button className="w-full mt-2 bg-red-600 hover:bg-red-700" size="sm" onClick={stopScreenRecording}>
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    {recordedUrl && (
                      <video ref={screenRecordingRef} src={recordedUrl} height={200} width={350} controls className="mt-2" />
                    )}
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
                      Find the population of the 3rd largest city in a EU
                      country that joined in 2004
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
                    <Button className="w-full" size="sm" onClick={startScreenRecording}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                    {isRecording && (
                      <Button className="w-full mt-2 bg-red-600 hover:bg-red-700" size="sm" onClick={stopScreenRecording}>
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    {recordedUrl && (
                      <video ref={screenRecordingRef} src={recordedUrl} height={200} width={350} controls className="mt-2" />
                    )}
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Globe className="h-6 w-6 text-primary" />
                      <Badge variant="outline">Wikipedia</Badge>
                    </div>
                    <CardTitle className="text-lg">History Hunter</CardTitle>
                    <CardDescription>
                      Find the Wikipedia page for a battle that took place in
                      1066
                    </CardDescription>
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
                    <Button className="w-full" size="sm" onClick={startScreenRecording}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                    {isRecording && (
                      <Button className="w-full mt-2 bg-red-600 hover:bg-red-700" size="sm" onClick={stopScreenRecording}>
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    {recordedUrl && (
                      <video ref={screenRecordingRef} src={recordedUrl} height={200} width={350} controls className="mt-2" />
                    )}
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <Badge variant="outline">Finance</Badge>
                    </div>
                    <CardTitle className="text-lg">Market Finder</CardTitle>
                    <CardDescription>
                      Find a stock that gained more than 50% in the last year
                    </CardDescription>
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
                    <Button className="w-full" size="sm" onClick={startScreenRecording}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start & Record
                    </Button>
                    {isRecording && (
                      <Button className="w-full mt-2 bg-red-600 hover:bg-red-700" size="sm" onClick={stopScreenRecording}>
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    {recordedUrl && (
                      <video ref={screenRecordingRef} src={recordedUrl} height={200} width={350} controls className="mt-2" />
                    )}
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
                      <p className="text-sm text-muted-foreground">
                        Found: Back to the Future • 2:34 completion time
                      </p>
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
                      <p className="text-sm text-muted-foreground">
                        Found: Kraków, Poland • 8:12 completion time
                      </p>
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
      <Toaster />
    </div>
  );
}
