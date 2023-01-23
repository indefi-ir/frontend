const FinancierIcon = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Stockholm-icons-/-Shopping-/-Money" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
          <rect id="bound" x="0" y="0" width="24" height="24"></rect>
          <path d="M2,6 L21,6 C21.5522847,6 22,6.44771525 22,7 L22,17 C22,17.5522847 21.5522847,18 21,18 L2,18 C1.44771525,18 1,17.5522847 1,17 L1,7 C1,6.44771525 1.44771525,6 2,6 Z M11.5,16 C13.709139,16 15.5,14.209139 15.5,12 C15.5,9.790861 13.709139,8 11.5,8 C9.290861,8 7.5,9.790861 7.5,12 C7.5,14.209139 9.290861,16 11.5,16 Z" id="Combined-Shape-Copy" fill={color} opacity="0.3" transform="translate(11.500000, 12.000000) rotate(-345.000000) translate(-11.500000, -12.000000) "></path>
          <path d="M2,6 L21,6 C21.5522847,6 22,6.44771525 22,7 L22,17 C22,17.5522847 21.5522847,18 21,18 L2,18 C1.44771525,18 1,17.5522847 1,17 L1,7 C1,6.44771525 1.44771525,6 2,6 Z M11.5,16 C13.709139,16 15.5,14.209139 15.5,12 C15.5,9.790861 13.709139,8 11.5,8 C9.290861,8 7.5,9.790861 7.5,12 C7.5,14.209139 9.290861,16 11.5,16 Z M11.5,14 C12.6045695,14 13.5,13.1045695 13.5,12 C13.5,10.8954305 12.6045695,10 11.5,10 C10.3954305,10 9.5,10.8954305 9.5,12 C9.5,13.1045695 10.3954305,14 11.5,14 Z" id="Combined-Shape" fill={color}></path>
        </g>
      </svg>
    </span>
  )
}
export default FinancierIcon