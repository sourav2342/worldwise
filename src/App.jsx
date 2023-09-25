import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Pagenotfound from "./pages/Pagenotfound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./Componets/CityList";
import City from "./Componets/City";
import Form from "./Componets/Form.jsx";
import "./index.css";
import CountriesList from "./Componets/CountriesList";
import { CitiesProvider , useCities} from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuth";
import ProtectingRoute from "./pages/ProtectingRoute";



function App() {

  return (
   <AuthProvider>
   <CitiesProvider>
    <BrowserRouter>
       <Routes>
        <Route index element={<Homepage /> } />
        <Route path="pricing" element={<Pricing />} />
        <Route path="Product" element={<Product />} />
        <Route path="app" element=
        {
        <ProtectingRoute>
          <AppLayout />
        </ProtectingRoute>
        }>
            <Route index element={<Navigate to="cities"/>}/>   {/*  index route */}
            <Route path="cities" element={<CityList />}/>
            <Route path="cities/:id" element={<City />}/>
            <Route path="country" element={<CountriesList/>}/>
            <Route path="form" element={<Form/>}/>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<Pagenotfound />}/>
       </Routes>
    </BrowserRouter>
    </CitiesProvider> 
    </AuthProvider>
  )

}

export default App
