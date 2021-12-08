import { getProviders, getSession, useSession } from "next-auth/react";
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { modalState } from '../atoms/modalAtom';
import { ArrowLeftIcon } from '@heroicons/react/outline';

import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Login from '../components/Login';
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, orderBy, query, collection } from '@firebase/firestore';
import { db } from '../firebase';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Widgets from '../components/Widgets';

const PostPage = ({ trendingResults, followResults, providers, }) => {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [isOpen, setIsOpen] = useRecoilState(modalState);


    if (!session) return <Login providers={providers} />;

    useEffect(() => {
        onSnapshot(doc(db, 'posts', id), snapshot => {
            setPost(snapshot.data());
        })
    }, [db]);


    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => {
            setComments(snapshot.docs)
        })
    }, [db, id]);


    return (
        <div className="">
            <Head>
                <title>{post?.username} on Twitter: "{post?.text}"</title>
            </Head>
            <main className='bg-black flex min-h-screen max-w-[1500px] mx-auto'>
                <Sidebar />
                <div className="text-white flex-grow flex-[0.4] border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                        <div className="hoverAnimation xl:w-9 xl:h-9 flex items-center justify-center xl:px-0"
                            onClick={() => router.push('/')}>
                            <ArrowLeftIcon className="h-5 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-xl mr-auto font-bold">Tweet</h2>
                    </div>
                    <Post id={id} post={post} postPage />
                    <div>
                        {comments.length ? (
                            <div className='pb-72'>
                                {comments.map(comment => <Comment key={comment.id} id={comment.id} comment={comment.data()} />)}
                            </div>
                        ) : 'There are not comments. Be the first!'}
                    </div>
                </div>
                {isOpen && <Modal />}
                <Widgets trendingResults={trendingResults} followResults={followResults} />
            </main>
        </div>
    )
};

export async function getServerSideProps(context) {
    const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
        (res) => res.json()
    );
    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
        (res) => res.json()
    );
    const providers = await getProviders();
    const session = await getSession(context);

    return {
        props: {
            trendingResults,
            followResults,
            providers,
            session,
        },
    };
};

export default PostPage;

//5:30:00