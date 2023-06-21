const FinancierIcon = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg height={height} viewBox="0 0 21 24" width={width} fill={color} xmlns="http://www.w3.org/2000/svg"><path d="m528.499822 101c.314062.41808.500178.937804.500178 1.500939v12.313463 6.754717l2.506378-1.66002 2.492272 1.957393 2.564968-1.976991 2.46601 1.974432 2.531695-1.955398 2.438677 1.649601v-18.056749c0-1.382239-1.116025-2.501387-2.49254-2.501387zm-1.999822-1h15.00746c1.929426 0 3.49254 1.567488 3.49254 3.501387v19.940477l-3.399851-2.29977-2.58164 1.993973-2.466643-1.974939-2.558984 1.97238-2.536309-1.991978-3.456573 2.289351v-8.616479-12.313463c0-.828846-.67172-1.500939-1.5-1.500939-.833493 0-1.5.666363-1.5 1.494248v3.545105h3.727627v1h-4.727627v-4.545105c0-1.380219 1.114271-2.494248 2.5-2.494248zm4.5 7v-1h11v1zm0 3v-1h11v1zm0 3v-1h11v1zm0 3v-1h7v1z" transform="translate(-524 -100)" /></svg>
    </span>
  )
}
export default FinancierIcon