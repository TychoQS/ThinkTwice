import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
}

export const NetworkModel = {
  subscribe(callback: (status: NetworkStatus) => void) {
    return NetInfo.addEventListener((state: NetInfoState) => {
      callback({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
      });
    });
  },
  async getStatus(): Promise<NetworkStatus> {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
    };
  },
};
