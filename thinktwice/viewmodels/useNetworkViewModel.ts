import { useState, useEffect } from 'react';
import { NetworkModel, NetworkStatus } from '@/models/NetworkModel';

export function useNetworkViewModel() {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
  });

  useEffect(() => {
    // Initial fetch
    NetworkModel.getStatus().then(setStatus);

    // Subscriptions
    const unsubscribe = NetworkModel.subscribe(setStatus);
    return () => unsubscribe();
  }, []);

  // We consider it offline if either explicitly disconnected or internet is unreachable
  const isOffline = status.isConnected === false || status.isInternetReachable === false;

  return {
    isOffline,
  };
}
