const BillsCompanyIcon = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14C8 13.4477 8.44772 13 9 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H9C8.44772 15 8 14.5523 8 14Z" fill={color} />
        <path d="M9 9.5C8.44772 9.5 8 9.94772 8 10.5C8 11.0523 8.44772 11.5 9 11.5H15C15.5523 11.5 16 11.0523 16 10.5C16 9.94772 15.5523 9.5 15 9.5H9Z" fill={color} />
        <path d="M8 17.5C8 16.9477 8.44772 16.5 9 16.5H15C15.5523 16.5 16 16.9477 16 17.5C16 18.0523 15.5523 18.5 15 18.5H9C8.44772 18.5 8 18.0523 8 17.5Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M10 2C8.89543 2 8 2.89543 8 4L7 4C5.34315 4 4 5.34315 4 7V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V7C20 5.34315 18.6569 4 17 4H16C16 2.89543 15.1046 2 14 2H10ZM14 4H10V6H14V4ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill={color} />
      </svg>
    </span>
  )
}
export default BillsCompanyIcon;