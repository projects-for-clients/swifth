import React from 'react'

interface Props {
  width?: number
  height?: number
  fill?: string
}
function notificationSvg({
  width = 30,
  height = 30,
  fill = '#251A45',
}:Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.975 25.6624C17.8875 25.6624 20.8 25.1999 23.5625 24.2749C24.6125 23.9124 25.4125 23.1749 25.7625 22.2124C26.125 21.2499 26 20.1874 25.425 19.2374L23.9875 16.8499C23.6875 16.3499 23.4125 15.3499 23.4125 14.7624V11.1499C23.4125 6.4999 19.625 2.7124 14.975 2.7124C10.325 2.7124 6.53754 6.4999 6.53754 11.1499V14.7624C6.53754 15.3374 6.26254 16.3499 5.96254 16.8624L4.53754 19.2374C4.00004 20.1374 3.90004 21.2249 4.26254 22.2124C4.62504 23.1999 5.41254 23.9499 6.40004 24.2749C9.15004 25.1999 12.0625 25.6624 14.975 25.6624ZM14.975 4.5874C18.5875 4.5874 21.5375 7.5249 21.5375 11.1499V14.7624C21.5375 15.6749 21.9125 17.0249 22.375 17.8124L23.8125 20.1999C24.0875 20.6624 24.1625 21.1499 24 21.5624C23.85 21.9874 23.475 22.3124 22.9625 22.4874C17.7375 24.2374 12.2 24.2374 6.97504 22.4874C6.52504 22.3374 6.17504 21.9999 6.01254 21.5499C5.85004 21.0999 5.88754 20.6124 6.13754 20.1999L7.57504 17.8124C8.05004 16.9999 8.41254 15.6624 8.41254 14.7499V11.1499C8.41254 7.5249 11.35 4.5874 14.975 4.5874Z"
        fill={fill}
      />
      <path
        d="M12.65 4.9251C12.7375 4.9251 12.825 4.9126 12.9125 4.8876C13.275 4.7876 13.625 4.7126 13.9625 4.6626C15.025 4.5251 16.05 4.6001 17.0125 4.8876C17.3625 5.0001 17.7375 4.8876 17.975 4.6251C18.2125 4.3626 18.2875 3.9876 18.15 3.6501C17.6375 2.3376 16.3875 1.4751 14.9625 1.4751C13.5375 1.4751 12.2875 2.3251 11.775 3.6501C11.65 3.9876 11.7125 4.3626 11.95 4.6251C12.1375 4.8251 12.4 4.9251 12.65 4.9251Z"
        fill={fill}
      />
      <path
        d="M14.975 28.5127C16.2125 28.5127 17.4125 28.0127 18.2875 27.1377C19.1625 26.2627 19.6625 25.0627 19.6625 23.8252H17.7875C17.7875 24.5627 17.4875 25.2877 16.9625 25.8127C16.4375 26.3377 15.7125 26.6377 14.975 26.6377C13.425 26.6377 12.1625 25.3752 12.1625 23.8252H10.2875C10.2875 26.4127 12.3875 28.5127 14.975 28.5127Z"
        fill={fill}
      />
    </svg>
  );
}

export default notificationSvg