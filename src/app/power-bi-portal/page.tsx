
'use client';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Users, Syringe, Activity } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTranslation } from '@/context/translation-context';


// Fictional data for demonstration purposes
const diseaseData = [
  { name: 'Flu', cases: 4500 },
  { name: 'Dengue', cases: 2300 },
  { name: 'Malaria', cases: 1800 },
  { name: 'COVID-19', cases: 1200 },
  { name: 'Typhoid', cases: 950 },
  { name: 'Tuberculosis', cases: 600 },
];

const healthTrendsData = [
  { month: 'Jan', fluCases: 400, dengueCases: 240 },
  { month: 'Feb', fluCases: 300, dengueCases: 221 },
  { month: 'Mar', fluCases: 500, dengueCases: 229 },
  { month: 'Apr', fluCases: 480, dengueCases: 300 },
  { month: 'May', fluCases: 590, dengueCases: 400 },
  { month: 'Jun', fluCases: 650, dengueCases: 450 },
];


export default function AnalysisPortal() {
    const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container space-y-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Odisha Health Analytics Dashboard
            </h1>
            <p className="mx-auto mt-2 max-w-[700px] text-muted-foreground md:text-lg">
                An overview of key public health metrics and disease trends.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Population</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.37 Cr</div>
                <p className="text-xs text-muted-foreground">as of 2024 (projected)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Cases</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11,350</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vaccination Rate</CardTitle>
                <Syringe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">88.5%</div>
                <p className="text-xs text-muted-foreground">Fully vaccinated (2 doses)</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Health Budget</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹16,048 Cr</div>
                <p className="text-xs text-muted-foreground">for 2023-24</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Disease Prevalence</CardTitle>
                <CardDescription>Number of reported cases for major diseases.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={diseaseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cases" fill="hsl(var(--primary))" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Health Trends</CardTitle>
                <CardDescription>Tracking Flu vs. Dengue cases over the past 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={healthTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="fluCases" name="Flu" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="dengueCases" name="Dengue" stroke="hsl(var(--chart-2))" />
                    </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
