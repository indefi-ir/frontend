const BuildingIcon = (props: any) => {
  const { color = "currentColor", width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 5H9V7H7V5Z" fill={color} />
        <path d="M9 9H7V11H9V9Z" fill={color} />
        <path d="M7 13H9V15H7V13Z" fill={color} />
        <path d="M13 5H11V7H13V5Z" fill={color} />
        <path d="M17 13H15V15H17V13Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M18 9H17V5C17 3.34315 15.6569 2 14 2H6C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V12C21 10.3431 19.6569 9 18 9ZM6 4H14C14.5523 4 15 4.44772 15 5V9H14C12.3431 9 11 10.3431 11 12V19C11 19.3506 11.0602 19.6872 11.1707 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44771 4 6 4ZM18 20H14C13.4477 20 13 19.5523 13 19V12C13 11.4477 13.4477 11 14 11H18C18.5523 11 19 11.4477 19 12V19C19 19.5523 18.5523 20 18 20Z" fill={color} />
      </svg>
    </span>
  )
}
export default BuildingIcon