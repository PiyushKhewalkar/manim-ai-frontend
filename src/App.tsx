import React from 'react';
import Layout from './components/Layout';
import { AnimationProvider } from './context/AnimationContext';

function App() {
  return (
    <AnimationProvider>
      <Layout />
    </AnimationProvider>
  );
}

export default App;