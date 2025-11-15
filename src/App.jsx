import { AppRoutes } from './components/AppRoutes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	);
}

export default App;
