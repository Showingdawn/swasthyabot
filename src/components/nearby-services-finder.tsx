
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { findNearbyServicesAction } from '@/app/actions';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FindNearbyServicesOutput } from '@/ai/flows/nearby-services-flow';

type ServiceType = 'hospital' | 'pharmacy' | 'clinic' | 'blood bank';

export function NearbyServicesFinder() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FindNearbyServicesOutput | null>(null);
  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const { toast } = useToast();

  const getLocation = () => {
    setLoading(true);
    setError(null);
    setResult(null);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
        toast({
          title: 'Location Acquired',
          description: 'Your location has been successfully acquired.',
        });
      },
      () => {
        setError('Unable to retrieve your location. Please enable location services in your browser.');
        setLoading(false);
        toast({
            variant: 'destructive',
            title: 'Location Access Denied',
            description: 'Please enable location permissions to use this feature.',
        });
      }
    );
  };

  const handleFindServices = async (serviceType: ServiceType) => {
    if (!location) {
        toast({
            variant: 'destructive',
            title: 'Location Not Found',
            description: 'Please get your location first before searching for services.',
        });
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveService(serviceType);
    try {
      const res = await findNearbyServicesAction(location.latitude, location.longitude, serviceType);
      if (res.message === 'success' && res.data) {
        setResult(res.data);
      } else {
        setError(res.message || 'An unknown error occurred.');
      }
    } catch (e) {
      setError('Failed to fetch services. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Services Finder</CardTitle>
        <CardDescription>
          Find hospitals, pharmacies, clinics, and blood banks near you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Button onClick={getLocation} disabled={loading}>
            {loading && !result ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Navigation className="mr-2 h-4 w-4" />}
            Get My Current Location
          </Button>
          {location && (
            <p className="mt-2 text-sm text-green-600">
              Location acquired: Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Button variant={activeService === 'hospital' ? 'default' : 'outline'} onClick={() => handleFindServices('hospital')} disabled={loading || !location}>
                Find Hospitals
            </Button>
            <Button variant={activeService === 'pharmacy' ? 'default' : 'outline'} onClick={() => handleFindServices('pharmacy')} disabled={loading || !location}>
                Find Pharmacies
            </Button>
            <Button variant={activeService === 'clinic' ? 'default' : 'outline'} onClick={() => handleFindServices('clinic')} disabled={loading || !location}>
                Find Clinics
            </Button>
            <Button variant={activeService === 'blood bank' ? 'default' : 'outline'} onClick={() => handleFindServices('blood bank')} disabled={loading || !location}>
                Find Blood Banks
            </Button>
        </div>

        {loading && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        
        {result && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Results</h3>
            {result.services.length > 0 ? (
                <ul className="space-y-4">
                {result.services.map((service, index) => (
                    <li key={index} className="rounded-lg border p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary">{service.distance}</p>
                        </div>
                      </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No services found nearby.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
