import { useCallback } from 'react';
import ButtonMap from './ButtonMap';
import { useConnection } from '../ConnectionContext';

export default function RemoteControl() {
  const { sendButton } = useConnection();

  const handlePress = useCallback(async (buttonId: string) => {
    try {
      await sendButton(buttonId);
    } catch {
      // Errors are non-fatal for the UI — button feedback handles it
    }
  }, [sendButton]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 'var(--space-md)',
    }}>
      <ButtonMap onButtonPress={handlePress} />
    </div>
  );
}
