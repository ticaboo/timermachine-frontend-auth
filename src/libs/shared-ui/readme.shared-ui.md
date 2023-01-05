# shared-ui readme

Just a folder for forging truely reusable components.
Note: react-native-web alaised as react-native in package.json alais: {} section.
update: storybook barfing errors on this. So until proven need - importing from 'react-native-web'

Guidelines:

use react-native (web) as per sample.
That way more (not 100% until tested) portable to react native. - just nice semantics,
and prop exposure too. Use react native component props as exemplar reference for component design.
each component must be in storybook.

Roadmap:

share with react native app, and test components work.
Migrate to NX monorepo.
