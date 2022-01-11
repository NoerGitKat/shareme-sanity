import type { NextPage } from 'next';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { IUser } from '../interfaces';
import { client } from '../sanity-client';

const Login: NextPage = () => {
  const { push } = useRouter();

  const shareVideo = '/assets/share-vid.mp4';
  const logo = '/assets/logowhite.png';

  const handleLogin = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const { profileObj } = response as GoogleLoginResponse;
    if (profileObj) {
      // Set to localStorage
      localStorage.setItem('user', JSON.stringify(profileObj));

      const { name, googleId, imageUrl } = profileObj;

      // Fields to store user in Sanity
      const newUser: IUser = {
        _id: googleId,
        _type: 'user',
        username: name,
        image: imageUrl,
      };

      const isCreated = await client.createIfNotExists(newUser);
      if (isCreated) push('/');
    }
  };

  return (
    <main className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-column justify-center items-center top-0 left-0 bottom-0 right-0">
        <div className="p-5">
          <img src={logo} width="130px" alt="White Logo" />
        </div>
        <div className="shadow-2x1">
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN as string}
            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-2" />
                Sign in with Google
              </button>
            )}
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
