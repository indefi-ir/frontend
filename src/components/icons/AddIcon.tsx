const AddIcon = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect>
        <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill={color}></rect>
      </svg>
    </span>
  )
}
export default AddIcon