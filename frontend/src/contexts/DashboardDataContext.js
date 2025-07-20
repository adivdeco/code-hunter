// contexts/DashboardDataContext.js
import { createContext, useContext } from 'react';

const DashboardDataContext = createContext();  // This creates a new context object called DashboardDataContext.


export const useDashboardData = () => useContext(DashboardDataContext);
// This exports a custom hook called useDashboardData.
// When you call useDashboardData() inside a component, it gives you access to whatever value is stored in DashboardDataContext (like user data, dashboard stats, etc.).
// Under the hood, it just calls useContext(DashboardDataContext).

export default DashboardDataContext;



// useContext: Used to access the value of a context inside a component