module.exports = {
    title: "TCO Training",
    description: "Static website for sharing technical exercises and tutorials",
    themeConfig: {
        sidebarDepth: 2,
        sidebar: [
            "/",
            {
                title: "Exercises",
                collapsable: false,
                path: "/tco/",
                children: [
                    {
                        title: "Awesome School - Part 1",
                        path: "/tco/exercises/awesome_school.html",
                    },
                    {
                        title: "Awesome School - Part 2",
                        path: "/tco/exercises/awesome_school_2.html",
                    },
                    {
                        title: "Awesome School - Part 3",
                        path: "/tco/exercises/awesome_school_3.html",
                    },
                    {
                        title: "Realty Management - Part 1",
                        path: "/tco/exercises/realty_management.html",
                    },
                    {
                        title: "Realty Management - Part 2",
                        path: "/tco/exercises/realty_management_2.html",
                    },
                    {
                        title: "Realty Management - Part 3",
                        path: "/tco/exercises/realty_management_3.html",
                    },
                ],
            },
            {
                title: "Solutions",
                collapsable: false,
                path: "/tco/solutions/",
                children: [],
            },
        ],
    },
};
