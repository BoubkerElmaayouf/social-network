'use client';
import React from 'react';
// import './content.css';
import { Footer, Navbarrend } from '../page.js';

export default function Content() {
    return (
        <div className='hero'>
            <div className='main-content'>
            </div>
            <Footer/>
        </div>
    );
}

export function Leftsidebar() {
    return (
        <div className='sidebar'>
        </div>
    );
}
export function Rightsidebar() {
    return (
        <div className='sidebar'>
        </div>
    );
}

export function chatbox() {
    return (
        <div className='chatbox'>
        </div>
    );
}

export function navbar() {
    return (
        <div className='navbar'>
        </div>
    );
}