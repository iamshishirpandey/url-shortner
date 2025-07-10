import { GetServerSideProps } from 'next';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

interface RedirectPageProps {
  notFound?: boolean;
}

export default function RedirectPage({ notFound }: RedirectPageProps) {
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-lg text-slate-600">Short URL not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-lg text-slate-600">Redirecting...</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || typeof id !== 'string') {
    return {
      props: {
        notFound: true,
      },
    };
  }

  try {
    const url = await prisma.url.findUnique({
      where: {
        shortened: id,
      },
    });

    if (!url) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    return {
      redirect: {
        destination: url.original,
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      props: {
        notFound: true,
      },
    };
  }
};