const EyeIcon = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className = '' } = props;
  return (
    <span className={className}>
      <svg width={width} height={height} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.00004 0.166626C3.89171 0.166626 1.47443 3.5916 0.623465 5.19278C0.352501 5.70262 0.352501 6.2973 0.623465 6.80714C1.47443 8.40832 3.89171 11.8333 9.00004 11.8333C14.1084 11.8333 16.5256 8.40832 17.3766 6.80714C17.6476 6.29729 17.6476 5.70262 17.3766 5.19277C16.5256 3.5916 14.1084 0.166626 9.00004 0.166626ZM13.3031 3.0647C14.6866 3.98141 15.4945 5.20281 15.9049 5.97494C15.9095 5.98357 15.9114 5.98955 15.9122 5.99283C15.913 5.99617 15.9132 5.99996 15.9132 5.99996C15.9132 5.99996 15.913 6.00375 15.9122 6.00709C15.9114 6.01037 15.9095 6.01635 15.9049 6.02497C15.4945 6.7971 14.6866 8.01851 13.3031 8.93521C13.8743 8.09943 14.2084 7.08871 14.2084 5.99996C14.2084 4.91121 13.8743 3.90049 13.3031 3.0647ZM4.69698 8.9352C3.31343 8.0185 2.50555 6.7971 2.09519 6.02497C2.09061 6.01635 2.08873 6.01037 2.0879 6.00709C2.08736 6.00492 2.08699 6.00187 2.08699 6.00187L2.08691 5.99996L2.0872 5.99629L2.0879 5.99283C2.08873 5.98955 2.09061 5.98357 2.0952 5.97494C2.50555 5.20282 3.31343 3.98142 4.69698 3.06471C4.12576 3.9005 3.7917 4.91122 3.7917 5.99996C3.7917 7.0887 4.12576 8.09942 4.69698 8.9352ZM12.5417 5.99996C12.5417 4.04395 10.956 2.45829 9.00003 2.45829C7.04403 2.45829 5.45837 4.04395 5.45837 5.99996C5.45837 7.95597 7.04403 9.54163 9.00003 9.54163C10.956 9.54163 12.5417 7.95597 12.5417 5.99996Z" fill="#667085" />
      </svg>
    </span>
  )
}
export default EyeIcon