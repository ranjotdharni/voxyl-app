![Voxyl][titleImg]

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Synopsis](#synopsis)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  - [Navigation](#navigation)
  - [Teams](#teams)
    - [Create Teams](#create-teams)
    - [Add Team Members](#add-team-members)
    - [Modify Your Teams](#modify-your-teams)
  - [Projects](#projects)
    - [Launch A Project](#launch-a-project)
    - [Save Your Project](#save-your-project)
    - [Manage Project Members](#manage-project-members)
  - [Color Themes](#color-themes)
    - [Theme Reference](#theme-reference)
- [Todo List](#todo-list)


# Synopsis
**Voxyl** is a full-stack team and project management application that offers the capabilities to form teams, plan projects, and track progress along with performance. 

Voxyl members can formulate teams and assign hierarchical permissions to manage roles. The application offers an imperative, layered approach to project planning or easy organization of relevant tasks assigned to each project. Lastly, Voxyl offers graphical visualizations of project progress and team member contributions to enable efficient project/team monitoring. At its core, Voxyl uses a static **React** front-end (in **TypeScript**) coupled with the **Django** framework to leverage its robust back-end capabilities (in **Python**). You can access Voxyl [here][appLink].

*Disclaimer: The Voxyl instance may go to sleep as a result of prolonged inactivity causing your first request to the site to be delayed by up to 50 seconds as the instance spins back up. This will only happen on your first request to the service and is an effort to conserve server resources.*

# Tech Stack
Voxyl was built on the following **technologies:**

[![Python][pythonImg]][pythonLink]
[![Django][djangoImg]][djangoLink]
[![TypeScript][typescriptImg]][typescriptLink]
[![React][reactImg]][reactLink]
[![ApexCharts][apexchartsImg]][apexchartsLink]

# Usage
Navigate to the Voxyl landing page and click the *Sign Up* button to create an account. This will redirect you to the sign-up page.*

![Sign Up Screen][signupScreenshot]
**You may also choose to log in if you're already an existing user*

## Navigation
Once you are logged in, you can click the *Menu* icon at the very top-left corner of the page to access the **Navigation Bar.** Hovering over an icon in the Navbar will display a tool-tip text to inform you which page it links to. This is how we can navigate between the primary pages of the web application as referenced in the following sections.

## Teams
Navigate to your **Teams Dashboard** for an overview of your teams and each of your teams' members. When you first create an account, Voxyl will assign you ownership of a default team named *Your Team.* You may choose to delete this default team later, however, Voxyl requires that you always retain ownership of at least one team. Therefore, you must create at least one other team before you can delete the default team.

### Create Teams
From your Teams Dashboard, navigate to the **Create New Team** module where you will be presented with two required fields before you can make a new team.

![Create Team Module][createteamScreenshot]

Enter a name for your team, a team description, and then click the *Create* button to finish creating your new team.

### Add Team Members
From your Teams Dashboard, navigate to the **Add Team Member** module where you will be presented with a drop-down list, a text input, and a checklist display.

![Select Team to Add to][addmemberScreenshot1]

Using the drop-down list, select the team to which you'd like to add a new member to. Use the text input to formulate a search on Voxyl users, then click the *Search* button to execute your search query. Searching for users by **Username** or by **Email Address** is recommended since these values are unique to each user on Voxyl. You may also search for users by name; for optimal results, specify either a full first or full last name individually, or specify a full name together (space-separated).

![Select Members to Add][addmemberScreenshot2]

Upon a successful search, the checklist display will populate with the returned resources. Select all members that you would like to add to your team and click the *Add* button. Your Teams Dashboard will refresh to reflect any newly added members on your selected team.

### Modify Your Teams
From your Teams Dashboard, navigate to the **View Your Teams** module where you will be presented with two drop-down lists, one to select the team you want to view, and one to select the team member you'd like to view respectively. From here, you can view some more details of a member on any of your teams.

![Modify Team Member][modifyteamsScreenshot1]

To drop a member from the selected team, use the *Drop This Member* button (Note: This action requires **Moderator** level permissions or higher). Notice that you may also disband a team from this view using the *Disband* button in the top-right corner of the module, however, this privilege is restricted to the **Team Owner.**

The other half of this module presents the **Role Assignment** interface; this is synonymous with assigning permissions to each member of your team. 

![Modify Member Permissions][modifyteamsScreenshot2]

Note that the **Role Permissions** for the currently selected team member is displayed in the top-right of this section of the module. To modify a member's permission level, simply select a role that is different from their existing assignment and click the *Save* button.

Each role can be described as follows (in ascending order):
1. **Member**
- This is the default role and has the lowest permission level. It has no special permissions.
2. **Senior Member**
- Senior Members can view the performance metrics of other team members.
3. **Lead**
- Leads can create new projects and manage members on team projects. This role has all permissions of lower roles.
4. **Moderator**
- Moderators can add, remove, and invite members to the team. This role has all permissions of lower roles.
5. **Captain**
- Captains have nearly every permission as the owner of the team (including role assignment), save only disbanding the team and transferring ownership (exclusive to Team Owner). A Captain's Teams Dashboard will present the teams that they're Captain of for them to freely edit. This role has all permissions of lower roles.
6. **Team Owner**
- The owner of the team; there may only be one Team Owner. Team Owner can disband the team or transfer ownership of the team by assigning another member as Team Owner. This role holds the highest permission level. This role has all permissions of lower roles.

*Disclaimer: A Team Owner may not demote themselves to a lower role. To accomplish this, they must transfer ownership of their team to another member first; this can be accomplished by selecting a team member and assigning them as Team Owner.*

## Projects
Navigate to the **Launch Project** page to initialize a new project.

### Launch A Project
From the launch page, use the drop-down list to select which of your teams to assign the project to.

![Launch Project][launchprojectScreenshot]

Use the text input to create a title for your project, and click the *Launch* button to launch your new project.

![Empty Project][newprojectScreenshot1]

Each **Project** consists of **Strides** and each Stride consists of **Steps.** Click the *New Stride* button in the top-right corner of the page to add a Stride to your new project (Note: You can click either of the edit buttons next to the project title or stride title to modify them).

![Add A Stride][newprojectScreenshot2]

Click the *New Step* button in the top-left corner of the Stride module to add a Step to your new Stride.

![Add A Step][newprojectScreenshot3]

Each step includes a title, a deadline, a status, a point count, and a description. Use the *expand* button on the right-side of the Step module to show the step description input. Voxyl provides 4 status' for you to label your steps:

- Unassigned (default)
- In Progress
- Complete
- Discarded

Click on the status label in the step module to cycle the step's status between these 4 options.

### Save Your Project
When you are satisfied with your changes, click the *Save* button in the top-right corner of the page to save your changes to the project (Note: Don't forget to save your changes whenever you modify an existing project).

### Manage Project Members
Click the *Add Team Member* button in the top-right corner of the page to open the team member management module. You will be presented with 2 checklists, one with all the team members on your project's team that are not participating in the project, and one with all the members of your team that are participating in the project, respectively. 

![Add Project Member][addprojectMembers]

From the *Add Members* checklist, select all team members you'd like to add to the project. Similarly, select all the team members you'd like to drop from the project using the *Drop Members* checklist. Once you are satisfied with your changes, click the *Save* button to effectuate your changes (Note: This privilege requires **Lead** permissions level or higher).

## Color Themes
Navigate to the **Settings** page to update your current color scheme.

![Edit Color Theme][colorthemes]

Toggle between **Dark** or **Light** mode and select one of the **6 color schemes per mode (12 total).** Take some time to try out a few different color schemes and find one that fits your style. Don't forget to click the *Save* button once you've selected a mode and/or theme to effectuate your new changes.

### Theme Reference
| Name                | Mode      | Base      |
| ------------------- | --------- | --------- |
| Beach Day           | Light     | Yellow    |
| Blue Sky            | Light     | Blue      |
| Mint Berry          | Light     | Green     |
| Lavender (default)  | Light     | Purple    |
| Lychee              | Light     | Pink      |
| Mango               | Light     | Orange    |
| Ra                  | Dark      | Yellow    |
| Tron                | Dark      | Blue      |
| Witchcraft          | Dark      | Green     |
| Energon             | Dark      | Purple    |
| Phonk               | Dark      | Pink      |
| Volcanic            | Dark      | orange    |

# Todo List
- [x] User Authentication
- [x] Crews Page
- [x] Projects Page
- [ ] Metrics Page
- [ ] Profile Page
- [ ] CA for DB (change sslmode to verify-full)

[titleImg]: /readmeAssets/title.png
[signupScreenshot]: /readmeAssets//signupScreenshot.PNG
[createteamScreenshot]: /readmeAssets/createteamScreenshot.PNG
[addmemberScreenshot1]: /readmeAssets/addmemberScreenshot1.PNG
[addmemberScreenshot2]: /readmeAssets/addmemberScreenshot2.PNG
[modifyteamsScreenshot1]: /readmeAssets/modifyTeamsScreenshot1.PNG
[modifyteamsScreenshot2]: /readmeAssets/modifyTeamsScreenshot2.PNG
[launchprojectScreenshot]: /readmeAssets/launchprojectScreenshot.PNG
[newprojectScreenshot1]: /readmeAssets/newprojectScreenshot.PNG
[newprojectScreenshot2]: /readmeAssets/newprojectScreenshot2.PNG
[newprojectScreenshot3]: /readmeAssets/newprojectScreenshot3.PNG
[addprojectMembers]: /readmeAssets/addprojectMembers.PNG
[colorthemes]: /readmeAssets//colorthemesScreenshot.PNG
[typescriptImg]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[reactImg]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=1c2c4c
[pythonImg]: https://img.shields.io/badge/Python-ffde57?style=for-the-badge&logo=python&logoColor=4584b6
[djangoImg]: https://img.shields.io/badge/Django-092e20?style=for-the-badge&logo=django&logoColor=white
[apexchartsImg]: https://img.shields.io/badge/ApexCharts-2e96e6?style=for-the-badge&logo=apexcharts

[appLink]: https://pitcrew.onrender.com
[typescriptLink]: https://www.typescriptlang.org/
[reactLink]: https://react.dev/
[pythonLink]: https://python.org
[djangoLink]: https://djangoproject.com
[apexchartsLink]: https://apexcharts.com/