// Mock credentials for demo
const DEMO_CREDENTIALS = {
    email: 'demo@example.com',
    password: 'password123'
  };
  
  export const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem('isAuthenticated', 'true');
      return;
    }
    
    throw new Error('Invalid credentials');
  };
  
  export const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      localStorage.setItem('isAuthenticated', 'true');
      return;
    }
    
    throw new Error('Registration failed');
  };
  
  export const logout = (): void => {
    localStorage.removeItem('isAuthenticated');
  };