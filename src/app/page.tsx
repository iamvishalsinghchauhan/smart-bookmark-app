"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data || []);
  };

  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setBookmarks(data || []);
    };

    fetchBookmarks();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setBookmarks([]);
  };

  const addBookmark = async () => {
    if (!user) return;
    if (!title || !url) return alert("Enter title and url");

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    if (error) alert(error.message);
    else {
      setTitle("");
      setUrl("");
    }
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Smart Bookmark App
        </h1>

        {!user ? (
          <div className="text-center">
            <button
              onClick={loginWithGoogle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">{user.email}</p>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </div>

            <div className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Title"
                className="w-full border px-3 py-2 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="URL"
                className="w-full border px-3 py-2 rounded-lg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button
                onClick={addBookmark}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Add Bookmark
              </button>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Your Bookmarks</h2>

              {bookmarks.length === 0 ? (
                <p className="text-gray-500">No bookmarks yet.</p>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.map((bm) => (
                    <li
                      key={bm.id}
                      className="border p-3 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{bm.title}</p>
                        <a
                          href={bm.url}
                          target="_blank"
                          className="text-blue-600 text-sm"
                        >
                          {bm.url}
                        </a>
                      </div>

                      <button
                        onClick={() => deleteBookmark(bm.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
