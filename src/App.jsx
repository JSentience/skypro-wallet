import { AppRoutes } from './components/AppRoutes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { TransactionsProvider } from './context/TransactionsContext';

function App() {
	return (
		<AuthProvider>
			<TransactionsProvider>
				<AppRoutes />
			</TransactionsProvider>
		</AuthProvider>
	);
}

export default App;
