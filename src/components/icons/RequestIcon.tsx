const RequestIcon = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 20.5C3.34315 20.5 2 19.1569 2 17.5V7C2 5.34315 3.34315 4 5 4H8.67157C9.46722 4 10.2303 4.31607 10.7929 4.87868L11.9142 6H18C19.6569 6 21 7.34315 21 9V11.1963C21.8867 11.6237 22.3805 12.6815 22.0084 13.6914L19.9821 19.1914C19.6924 19.9777 18.9433 20.5 18.1054 20.5H5ZM4 7C4 6.44772 4.44772 6 5 6H8.67157C8.93679 6 9.19114 6.10536 9.37868 6.29289L11.0858 8H18C18.5523 8 19 8.44772 19 9V11H7.32791C6.52322 11 5.7969 11.4823 5.48464 12.2239L4 15.7499V7ZM5.01212 18.5L18.1054 18.5L20.1317 13H7.32791L5.01212 18.5Z" fill={color} />
      </svg>
    </span>
  )
}
export default RequestIcon;