import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faList,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

library.add(faTrash, faPlus, faEdit, faList)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
