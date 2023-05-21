import { Breadcrumb as AntBreadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  
  let path;
  if (router) {
    path = router.asPath
  }

  return (
    <AntBreadcrumb className='mx-2'>
      {path === '/dashboard' ?
        (
          <AntBreadcrumb.Item>
            <Link href='/dashboard'>
              داشبورد
            </Link>
          </AntBreadcrumb.Item>
        ) : (
          <>
            <AntBreadcrumb.Item>
              <Link href='/dashboard'>
                داشبورد
              </Link>
            </AntBreadcrumb.Item>
            <AntBreadcrumb.Item>
              <Link href={`${path}`}>
                {path?.replace(/\//, '')}
              </Link>
            </AntBreadcrumb.Item>
          </>
        )
      }
    </AntBreadcrumb>
  )
}

export default Breadcrumb