import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function auth(req, res) {
  /**
   * Implement your own security here.
   *
   * It's your responsibility to ensure that the caller of this endpoint
   * is a valid user by validating the cookies or authentication headers
   * and that it has access to the requested room.
   */

  const clerkUser = await currentUser();

  if(!clerkUser) redirect('/sign-in');

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id,
    info: {
        id,
        name: `${firstName} ${lastName}`,
        email: emailAddresses[0].emailAddress,
        avatar: imageUrl,
        color: getUserColor(id),
    }
  }

  // Create an ID token for the user
  const { body, status } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: []
    },
    {
      userInfo: user.info,
    }
  );

  return new Response(body, { status });
}