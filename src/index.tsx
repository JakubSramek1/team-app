import ReactDOM from 'react-dom/client'
import App from './App'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import common_cs from './translations/cs/common.json'

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'cs',
    resources: {
        cs: {
            common: common_cs,
        },
    },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <I18nextProvider i18n={i18next}>
        <App />
    </I18nextProvider>
)
