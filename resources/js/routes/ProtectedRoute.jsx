import React, { Component } from 'react';
import { Route, Navigate } from 'react-router-dom';


function ProtectedRoute({ isAuth, children }) {
    if(!isAuth) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;