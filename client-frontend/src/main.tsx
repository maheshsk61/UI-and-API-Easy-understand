import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.tsx'
//step 2 Including Provider and passing store
createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <App/>
    </Provider>
)
