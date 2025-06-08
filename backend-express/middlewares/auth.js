// import express
const express = require("express");

// import jwt
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // get token
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "autenticanthed" });

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "invalid token" });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
