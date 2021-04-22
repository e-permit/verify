import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default ({ code }) => {
    if (code === "tr") {
        return <SvgIcon viewBox="0 0 8 12">
            <path fill="#E30A17" d="M0 0h12v8H0z" />
            <circle cx="4.25" cy="4" r="2" fill="#fff" />
            <circle cx="4.75" cy="4" r="1.6" fill="#e30a17" />
            <path fill="#fff" d="M5.83334 4l1.80901 .58779-1.11804-1.53885v1.90212l1.11804-1.53885z" />
        </SvgIcon>;
    } else if (code === "ua") {
        return <SvgIcon viewBox="0 0 3 2">
            <path fill="#0057B7" d="M0 0h3v2H0z" />
            <path fill="gold" d="M0 1h3v1H0z" />
        </SvgIcon>;
    } else if (code === "uz") {
        return <SvgIcon viewBox="0 0 500 250">
            <path fill="#1eb53a" d="M0 0h500v250H0z" />
            <path fill="#0099b5" d="M0 0h500v125H0z" />
            <path fill="#ce1126" d="M0 80h500v90H0z" />
            <path fill="#fff" d="M0 85h500v80H0z" />
            <circle cx="70" cy="40" r="30" fill="#fff" />
            <circle cx="80" cy="40" r="30" fill="#0099b5" />
            <g fill="#fff" transform="translate(136 64)">
                <g id="e">
                    <g id="d">
                        <g id="c">
                            <g id="b">
                                <path id="a" d="M0-6v6h3" transform="rotate(18 0 -6)" />
                                <use xlinkHref="#a" transform="scale(-1 1)" />
                            </g>
                            <use xlinkHref="#b" transform="rotate(72)" />
                        </g><use xlinkHref="#b" transform="rotate(-72)" />
                        <use xlinkHref="#c" transform="rotate(144)" />
                    </g>
                    <use xlinkHref="#d" y="-24" />
                    <use xlinkHref="#d" y="-48" />
                </g>
                <use xlinkHref="#e" x="24" />
                <use xlinkHref="#e" x="48" />
                <use xlinkHref="#d" x="-48" />
                <use xlinkHref="#d" x="-24" />
                <use xlinkHref="#d" x="-24" y="-24" />
            </g>
        </SvgIcon>;
    } else if (code === "ru") {
        return <SvgIcon viewBox="0 0 9 6">
        <rect fill="#fff" width="9" height="3"/>
        <rect fill="#d52b1e" y="3" width="9" height="3"/>
        <rect fill="#0039a6" y="2" width="9" height="2"/>        
        </SvgIcon>;
    }
}
