import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { AUTHOR_BY_GOOGLE_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      if (!profile?.id) {
        console.error('Profil Google invalide ou incomplet');
        return false; // ou gérer une redirection ou un message d'erreur approprié
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: profile.id });

      if (!existingUser) {
        try {
          await writeClient.create({
            _type: 'author',
            id: profile.id,
            name,
            username: profile.login,
            email,
            image,
            bio: profile.bio || '',
          });
        } catch (error) {
          console.error("Erreur lors de la création de l'utilisateur", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
