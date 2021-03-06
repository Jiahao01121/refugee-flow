import React from 'react';

const qaTitleStyle = {
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: 2,
};

export const accordions = [
  {
    name: 'MISSION',
    isClosed: false,
    contents: [
      { children: 'Refugee Flow uses compelling visual design with comprehensive data to humanize the perilous transformation of the refugee.',
      },
    ],
  },
  {
    name: 'VISION',
    isClosed: true,
    contents: [
      { children: "Refugee Flow's vision is for all people to live to their fullest potential without threat of violence and for all people to understand each person’s inherent dignity.",
      },
    ],
  },
  {
    name: 'PROJECT TEAM',
    isClosed: false,
    contents: [
      {
        children: (
          <>
            <em>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/will-su">Will Su - Co-Creator</a>
            </em>
            &nbsp;
            rides the line between design and technology.
            His work focuses on presenting data efficiently and beautifully with fluid interactivity.
            He has received awards from
            &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://www.informationisbeautifulawards.com/showcase/2348-nyc-foodiverse">Information is Beautiful</a>
            ,
            &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://www.awwwards.com/sites/nyc-foodiverse">Awwwards</a>
            &nbsp;
            and placed first at the
            &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@nycmedialab/prototyping-teams-win-12-000-in-prizes-at-mlbam-hackathon-organized-by-nyc-media-lab-d9fee4c7ccaf">MLB Advanced Media Hackathon</a>
            . He was featured at
            &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://www.nypl.org/events/exhibitions/nyc-foodiverse">New York Public Library</a>
            &nbsp;
            and NYC Media Lab 2017 conf. He speaks regularly at
            &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://www.meetup.com/UX-Support-Group/events/248956066/">Meetups</a>
            &nbsp;
            and
            &nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://dnnsociety.org/2018/01/01/from-graphic-designer-to-data-visualisation-specialist-a-sharing-from-will-su/">universities</a>
            &nbsp;
            about his learning path and perspective on data visualization.
          </>
        ),
      },
      {
        children: (
          <>
            <em>
              <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/abins'>Abin Abraham - Co-Creator</a>
            </em>
            &nbsp;
            is drawn to the intersection of technology, art, and policy.
            He is pursuing creative ways to understand the complex challenges facing the world
            today and believes that creativity is the key to effective policymaking.
            He works as a web developer at the United Nations Global Compact and has worked on
            &nbsp;
            <a href="https://www.unglobalcompact.org/interactive">UNGC Interactive</a>
            &nbsp;
            and the
            &nbsp;
            <a href="http://blueprint.unglobalcompact.org/">SDG Blueprint</a>
            .
          </>
        ),
      },
      {
        style: { fontSize: '17px', fontWeight: '800', margin: 0 },
        children: (
          <>
            <em>If you have any questions or feedback, please contact</em>
            &nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:refugeeflow@gmail.com"
              style={{ fontSize: '17px', fontWeight: '200', margin: 0, marginLeft: '8px', fontStyle: 'italic' }}
            >
              refugeeflow@gmail.com
            </a>
          </>
        ),
      },
    ],
  },
  {
    name: 'Q & A',
    isClosed: true,
    contents: [
      { children: 'What is Refugee Flow?',
        style: qaTitleStyle,
      },
      { children: 'Is an exploratory investigation of the migration crisis. Combining multiple datasets and interactive visualizations, the project aims to allow users to create a better understanding of the current crisis.',
      },

      { children: 'How can design and technology help find solutions in migration?',
        style: qaTitleStyle,
      },
      { children: 'Building solutions for the migration crisis requires political will, which must be driven by society. We are continually presented with facts and figures of the lingering refugee crisis but are unmoved. Our idea is to present this data in new, interesting, and visually appealing ways. Facts inform us, but they don’t push us to act. Emotion gets people to act. Refugee Flow aims to merge design and technology to help better understand the migration crisis in a way that resonates with users. We hope this inspires better solutions.',
      },

      { children: 'What makes your team unique for this project?',
        style: qaTitleStyle,
      },
      { children: 'Will brings the creative mind of a designer with new interpretations of existing information. He has the development chops to turn creative concepts into a working application. Abin brings his web development background along with a nuanced understanding of the UN system. This awareness allows him to see what change is needed. Together, they provide a unique set of creative design capabilities.',
      },

      { children: 'What does Refugee Flow do differently than existing datasets?',
        style: qaTitleStyle,
      },
      { children: 'Refugee Flow has collected multiple datasets together to create an exploratory look at the crisis in a way that has never been done before. No other project is as dynamic or interactive as the one we built. Previous dashboards or portals show static data but Refugee Flow allows users to explore and discover facts on their own. Instead of only showing general trends over time, Refugee Flow allows users to dive in deeper and move beyond trends by seeing information on a case by case basis.',
      },

      { children: 'Who can use Refugee Flow and how?',
        style: qaTitleStyle,
      },
      { children: 'Anyone can use Refugee Flow. We built it as an exploratory tool to bring greater understanding to the crisis. This tool is for the person who has heard about the crisis, but wants to learn more.',
      },

      { children: 'Why is Refugee Flow important?',
        style: qaTitleStyle,
      },
      { children: 'Currently, UNHCR reports that 68.5 million people are forcibly displaced around the world. Funding to tackle the current challenge is decreasing, not increasing. By 2050 the continued impact of climate change will forcibly displace 1 billion people. The crisis is getting worse, not better. We must gain a greater understanding and we need to figure out better solutions to this crisis. Refugee Flow is a call to this action.',
      },
    ],
  },
  {
    name: 'Data Sources',
    isClosed: true,
    contents: [
      {
        children: (
          <>
            &#8226;
            &nbsp;
            <em>
              <a target="_blank" rel="noopener noreferrer" href="http://popstats.unhcr.org/en/asylum_seekers_monthly">UNHCR Population Statistics Database</a>
            </em>
            &nbsp;
            currently contains data about UNHCR's populations of concern from the year 1951 up to 2014 and you can use it to investigate different aspects of these populations: their general composition by location of residence or origin, their status (refugees, asylum seekers, internally displaced persons, etc.), their evolution over time, and so on.
          </>
        ),
      },
      {
        children: (
          <>
            &#8226;
            &nbsp;
            <em>
              <a target="_blank" rel="noopener noreferrer" href='https://missingmigrants.iom.int/downloads'>Missing Migrants Project</a>
            </em>
            &nbsp;
            tracks deaths of migrants, including refugees and asylum-seekers, who have died or gone missing in the process of migration towards an international destination.
          </>
        ),
      },
      {
        children: (
          <>
            &#8226;
            &nbsp;
            <em>
              <a target="_blank" rel="noopener noreferrer" href='http://www.themigrantsfiles.com/'>The Migrants Files</a>
            </em>
            &nbsp;
            is a consortium of journalists from over 10 EU countries. It is coordinated by Journalism++.
          </>
        ),
      },
      {
        children: (
          <>
            &#8226;
            &nbsp;
            <em>
              <a target="_blank" rel="noopener noreferrer" href='https://frontex.europa.eu/along-eu-borders/migratory-map/'>Frontex</a>
            </em>
            &nbsp;
            the European Border and Coast Guard Agency, promotes, coordinates and develops European border management in line with the EU fundamental rights charter and the concept of Integrated Border Management. To help identify migratory patterns as well as trends in cross-border criminal activities, Frontex analyses data related to the situation at and beyond EU’s external borders.
          </>
        ),
      },
      {
        children: (
          <>
            &#8226;
            &nbsp;
            <em>
              <a target="_blank" rel="noopener noreferrer" href='https://www.acleddata.com/data/'>ACLED</a>
            </em>
            &nbsp;
            (Armed Conflict Location & Event Data) is a disaggregated conflict analysis and crisis mapping project. ACLED is the highest quality, most widely used, realtime data and analysis source on political violence and protest in the developing world. Practitioners, researchers and governments depend on ACLED for the latest reliable information on current conflict and disorder patterns.
          </>
        ),
      },
    ],
  },
];

export const accordionsDefaultVisibility = accordions.reduce((acc, accordion) => ({
  ...acc,
  [accordion.name]: { isClosed: accordion.isClosed },
}), {});
