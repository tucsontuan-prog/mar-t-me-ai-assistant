import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getChatAnalytics, ChatAnalytics as AnalyticsData } from "@/services/chatAnalyticsService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { MessageSquare, Users, Star, TrendingUp, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const ChatAnalytics = () => {
  const { t } = useLanguage();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await getChatAnalytics(30);
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-ocean-teal" />
      </div>
    );
  }

  if (!analytics) return null;

  const statCards = [
    {
      icon: Users,
      label: t("admin.analytics.sessions") || "Phiên chat",
      value: analytics.totalSessions,
      color: "bg-blue-500",
    },
    {
      icon: MessageSquare,
      label: t("admin.analytics.messages") || "Tin nhắn",
      value: analytics.totalMessages,
      color: "bg-green-500",
    },
    {
      icon: Star,
      label: t("admin.analytics.rating") || "Đánh giá TB",
      value: analytics.averageRating.toFixed(1),
      color: "bg-yellow-500",
    },
    {
      icon: TrendingUp,
      label: t("admin.analytics.daily") || "TB tin nhắn/ngày",
      value: analytics.dailyStats.length > 0 
        ? Math.round(analytics.totalMessages / analytics.dailyStats.length)
        : 0,
      color: "bg-purple-500",
    },
  ];

  // Prepare chart data
  const chartData = analytics.dailyStats.map((day) => ({
    date: new Date(day.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
    messages: day.messages,
    sessions: day.sessions,
  }));

  // Rating distribution data
  const ratingData = Object.entries(analytics.ratingDistribution).map(([rating, count]) => ({
    rating: `${rating} ⭐`,
    count,
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Messages Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("admin.analytics.messagesChart") || "Tin nhắn theo ngày"}</CardTitle>
            <CardDescription>30 ngày gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="hsl(var(--ocean-teal))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--ocean-teal))", strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                Chưa có dữ liệu
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("admin.analytics.ratingsChart") || "Phân bố đánh giá"}</CardTitle>
            <CardDescription>Mức độ hài lòng của khách hàng</CardDescription>
          </CardHeader>
          <CardContent>
            {ratingData.some(r => r.count > 0) ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="rating" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--ocean-teal))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                Chưa có đánh giá
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
