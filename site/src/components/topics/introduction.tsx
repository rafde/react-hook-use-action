import Image from 'next/image';
import { introductionConfig, } from '../nav-sidebar/config';

import Code from '../ui/code';
import Content from '../ui/content';
import GithubIcon from '../ui/githubIcon';
import Sect from '../ui/sect';
import CodeBlock from '../ui/codeBlock';

export default function IntroductionTopic() {
	return <Sect {...introductionConfig} Header="h2">
		<Content>
			<p className="flex flex-wrap items-center justify-center gap-2">
				<a
					href="https://github.com/rafde/react-hook-use-cta"
					target="_blank"
					className="size-5 overflow-hidden"
					rel="noreferrer"
					aria-label="Link to open new window react-hook-use-cta GitHub repository"
				>
					<GithubIcon />
				</a>
				<a
					href="https://github.com/rafde/react-hook-use-cta/blob/main/LICENSE"
					target="_blank"
					rel="noreferrer"
					aria-label="react-hook-use-cta license link">
					<Image
						alt="NPM License"
						src="https://img.shields.io/npm/l/react-hook-use-cta"
						width="75"
						height="20" />
				</a>
				<a
					href="https://www.npmjs.com/package/react-hook-use-cta"
					target="_blank"
					rel="noreferrer"
					aria-label="NPM react-hook-use-cta link">
					<Image
						alt="NPM Version"
						src="https://img.shields.io/npm/v/react-hook-use-cta"
						width="75"
						height="20" />
				</a>
				<a
					href="https://jsr.io/@rafde/react-hook-use-cta"
					target="_blank"
					rel="noreferrer"
					aria-label="JSR react-hook-use-cta link">
					<Image
						alt="JSR Version"
						src="https://img.shields.io/jsr/v/%40rafde/react-hook-use-cta"
						width="65"
						height="20" />
				</a>
				<Image
					alt="Test"
					src="https://github.com/rafde/react-hook-use-cta/actions/workflows/test.yml/badge.svg"
					width="115"
					height="20" />
			</p>

			<p>
				An alternative hook for useReducer, and useContext.
			</p>
			<p>
				Useful for making simple partial state updates, seeing how your state changes over time, and more.
			</p>

			<b>Features</b>
			<ol className="list-inside list-decimal">
				<li>
					Built-in History Tracking
					<ul className="list-inside list-[square] pl-6">
						<li>Automatically tracks previous states and changes</li>
						<li>Maintains initial state reference</li>
						<li>Makes it easy to implement undo/redo functionality</li>
					</ul>
				</li>
				<li>
					Type-Safe Action Handlers
					<ul className="list-inside list-[square] pl-6">
						<li>Actions are strongly typed</li>
						<li>Payload validation built-in</li>
						<li>Better IntelliSense support</li>
					</ul>
				</li>
				<li>
					Default Actions Out of the Box
					<ul className="list-inside list-[square] pl-6">
						<li>
							<Code>update</Code>
							: Merge new state
						</li>
						<li>
							<Code>reset</Code>
							: Reset to initial state
						</li>
						<li>
							<Code>replace</Code>
							: Replace entire state
						</li>
						<li>
							<Code>replaceInitial</Code>
							: Replace initial state
						</li>
						<li>
							<Code>updateInitial</Code>
							: Update initial state
						</li>
					</ul>
					<p>
						Example using built-in actions:
					</p>
					<CodeBlock isTrim={true}>
						{`
// Using update action
dispatch.cta.update({ count: 5 });

// Using reset action
dispatch.cta.reset();
					`}
					</CodeBlock>
				</li>
				<li>
					Flexible State Transformations
					<ul className="list-inside list-[square] pl-6">
						<li>Transform state before updates</li>
						<li>Compare states to prevent unnecessary renders</li>
						<li>Hook into state changes with afterActionChange</li>
					</ul>
					<p>
						Example with transformations:
					</p>
					<CodeBlock isTrim={true}>
						{`
const [history, dispatch] = useCTA({
  initial: { count: 0 },
  transform: (state) => ({
    ...state,
    doubled: state.count * 2
  }),
  actions: {
    increment: (history) => ({
      count: history.current.count + 1
    })
  }
});
					`}
					</CodeBlock>
				</li>
				<li>
					Context Integration
					<ul className="list-inside list-[square] pl-6">
						<li>Easy creation of context providers</li>
						<li>Simplified state sharing between components</li>
						<li>Type-safe context consumption</li>
					</ul>
				</li>
			</ol>
			<p>
				These features make react-hook-use-cta particularly powerful for:
			</p>
			<ul className="list-inside list-[square]">
				<li>Complex state management scenarios</li>
				<li>Applications requiring state history</li>
				<li>Cases where type safety is crucial</li>
				<li>Situations needing built-in state transformations</li>
				<li>Components sharing state through context</li>
			</ul>
			<p>The library provides a more structured and feature-rich approach compared to the basic state management offered by useState and useReducer, while maintaining type safety and reducing boilerplate code.</p>
		</Content>
		<Content>
			<p>
				Let&apos;s compare these approaches with clear examples to showcase react-hook-use-cta&apos;s advantages:
			</p>
			<ol className="list-inside list-decimal">
				<li>
					useState vs useCTA:
					<CodeBlock isTrim={true}>
						{`
// useState
const [profile, setProfile] = useState({
  user: {
    id: '',
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  },
  stats: {
    lastLogin: null,
    loginCount: 0,
    activeProjects: []
  }
});

const updatePreferences = (newPrefs) => {
  setProfile(prev => ({
    ...prev,
    user: {
      ...prev.user,
      preferences: {
        ...prev.user.preferences,
        ...newPrefs
      }
    }
  }));
};

const incrementLoginCount = () => {
  setProfile(prev => ({
    ...prev,
    stats: {
      ...prev.stats,
      loginCount: prev.stats.loginCount + 1,
      lastLogin: new Date()
    }
  }));
};

// useCTA - with history tracking and type safety
const [history, dispatch] = useCTA({
  initial: {
    user: {
      id: '',
      name: '',
      email: '',
      preferences: {
        theme: 'light',
        notifications: true
      }
    },
    stats: {
      lastLogin: null,
      loginCount: 0,
      activeProjects: []
    } 
  },
  actions: {
    updatePreferences({current}, newPrefs) {
      return {
        user: {
          ...current.user,
          preferences: {
            ...current.user.preferences,
            ...newPrefs
          }
        }
      }
    },
    incrementLoginCount({current},) {
      return {
        stats: {
          ...current.stats,
          loginCount: current.stats.loginCount + 1,
          lastLogin: new Date()
        }
      }
    }
  }
});
						`}
					</CodeBlock>
				</li>
				<li>
					useReducer vs useCTA:
					<CodeBlock isTrim={true}>
						{`
// useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'reset':
      return initialState;
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};
const [state, dispatch] = useReducer(reducer, { count: 0 });

// useCTA - built-in actions and type inference
const [history, dispatch] = useCTA({
  initial: { count: 0 },
  actions: {
    increment(ctaHistory) {
      const { current } = ctaHistory;
      return { count: current.count + 1 };
    }
  }
});
// Built-in: dispatch.update(), dispatch.reset(), dispatch.replace()
					`}
					</CodeBlock>
				</li>
				<li>
					createContext vs createCTAContext:
					<CodeBlock isTrim={true}>
						{`
// Regular Context
const CountContext = createContext(null);
const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

// createCTAContext - includes history and type-safe dispatch
const { CTAProvider, useCTAHistoryContext, useCTADispatchContext } = createCTAContext({
  initial: { count: 0 },
  actions: {
    increment(ctaHistory) {
      const { current } = ctaHistory;
      return { count: current.count + 1 };
    }
  }
});
					`}
					</CodeBlock>
				</li>
				<li>
					Zustand vs createCTASelector
					<CodeBlock isTrim={true}>
						{`
// Zustand approach
type ProfileState = {
  user: {
    id: string;
    name: string;
    email: string;
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  stats: {
    lastLogin: Date | null;
    loginCount: number;
    activeProjects: string[];
  };
  updatePreferences: (prefs: Partial<ProfileState['user']['preferences']>) => void;
  incrementLoginCount: () => void;
  addProject: (projectId: string) => void;
  getNameEmail: () => Pick<ProfileState['user'], 'name' | 'email'>;
}

const useProfileStore = create<ProfileState>((set, get) => ({
  user: {
    id: '',
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  },
  stats: {
    lastLogin: null,
    loginCount: 0,
    activeProjects: []
  },
  getNameEmail: () =>({
    name: get().user.name,
    email: get().user.email
  }),
  updatePreferences: (prefs) => set((state) => ({
    user: {
      ...state.user,
      preferences: {
        ...state.user.preferences,
        ...prefs
      }
    }
  })),
  incrementLoginCount: () => set((state) => ({
    stats: {
      ...state.stats,
      loginCount: state.stats.loginCount + 1,
      lastLogin: new Date()
    }
  })),
  addProject: (projectId) => set((state) => ({
    stats: {
      ...state.stats,
      activeProjects: [...state.stats.activeProjects, projectId]
    }
  }))
}));

const nameEmail = useProfileStore(useShallow((state) => state.getNameEmail()));

// react-hook-use-cta approach with history tracking and type safety
const useProfileCTA = createCTASelector({
  initial: {
    user: {
      id: '',
      name: '',
      email: '',
      preferences: {
        theme: 'light' as 'light' | 'dark',
        notifications: true
      }
    },
    stats: {
      lastLogin: null as Date | null,
      loginCount: 0,
      activeProjects: [] as string[]
    }
  },
  actions: {
    updatePreferences({ current }, payload: Partial<typeof current.user.preferences>) {
      return {
        user: {
          ...current.user,
          preferences: {
            ...current.user.preferences,
            ...payload
          }
        }
      };
    },
    incrementLoginCount({ current }) {
      return {
        stats: {
          ...current.stats,
          loginCount: current.stats.loginCount + 1,
          lastLogin: new Date()
        }
      };
    },
    addProject({ current }, projectId: string) {
      return {
        stats: {
          ...current.stats,
          activeProjects: [...current.stats.activeProjects, projectId]
        }
      };
    }
  },
  createFunc(dispatch) {
    return {
      getNameEmail() {
        const { current } = dispatch.history;
        return {
          name: current.user.name,
          email: current.user.email,
        };
      }
    }
  }
});

const nameEmail = useProfileCTA(({dispatch}) => dispatch.func.getNameEmail());
						`}
					</CodeBlock>
				</li>
			</ol>
		</Content>
	</Sect>;
}
