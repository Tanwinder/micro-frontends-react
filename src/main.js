import { Application, render } from './application';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Domcontent loaded');
    render(Application, document.getElementById('app'));
});
