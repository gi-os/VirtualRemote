import { useState } from 'react';
import { ConnectionProvider, useConnection } from './ConnectionContext';
import ConnectionScreen from './components/ConnectionScreen';
import RemoteControl from './components/RemoteControl';
import DevicesView from './components/DevicesView';
import StatusBar from './components/StatusBar';
import TabBar, { type TabId } from './components/TabBar';

function AppContent() {
  const { state } = useConnection();
  const [tab, setTab] = useState<TabId>('remote');

  if (state.status !== 'connected') {
    return <ConnectionScreen />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: 'var(--space-md)',
      gap: 'var(--space-md)',
    }}>
      <StatusBar />

      <div style={{
        flex: 1,
        display: 'flex',
        width: '100%',
        maxWidth: '600px',
        justifyContent: 'center',
      }}>
        {tab === 'remote' ? <RemoteControl /> : <DevicesView />}
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}

export default function App() {
  return (
    <ConnectionProvider>
      <AppContent />
    </ConnectionProvider>
  );
}
