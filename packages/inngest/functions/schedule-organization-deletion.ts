import { sendOrganizationDeletionEmail } from "@quizfit/emails";
import { disbandOrgUsers } from "@quizfit/enterprise/users";
import { env } from "@quizfit/env/server";
import { cancelOrganizationSubscription } from "@quizfit/payments";
import { prisma } from "@quizfit/prisma";

import { inngest } from "../inngest";

export const scheduleOrgDeletion = inngest.createFunction(
  {
    id: "schedule-org-deletion",
  },
  {
    event: "orgs/delete",
  },
  async ({ event, step }) => {
    await Promise.all(
      event.data.ownerEmails.map((email) =>
        step.run(
          "Send organization deletion email",
          async () =>
            await sendOrganizationDeletionEmail(email, {
              orgName: event.data.org.name,
            }),
        ),
      ),
    );

    if (env.SERVER_NAME === "production") {
      await step.sleep("wait-48-hours", "48h");
    }

    await cancelOrganizationSubscription(event.data.org.id);

    const deleted = await prisma.organization.delete({
      where: {
        id: event.data.org.id,
      },
    });

    await disbandOrgUsers(deleted.id);
  },
);
