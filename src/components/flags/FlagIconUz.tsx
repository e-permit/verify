export default function FlagIconUz() {
  return (
    <svg width={24} height={24} viewBox="0 0 500 250">
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
            </g>
            <use xlinkHref="#b" transform="rotate(-72)" />
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
    </svg>
  );
}
