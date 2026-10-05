import "./Header.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faBell} from "@fortawesome/free-regular-svg-icons";

function Header() {
    return (
        <>
            <div className="header">
                <div className="header__left-side">
                    <a href="/" className="header__logo">
                        <svg className="header__logo-image" role="img" aria-label="Logo" viewBox="0 0 110 56" focusable="false">
                            <use href="/icons.svg#payflow-logo" />
                        </svg>
                    </a>
                    <div className="header__separator">
                        <svg
                            aria-hidden="true"
                            width="16"
                            height="24"
                            viewBox="0 0 16 24"
                            focusable="false"
                        >
                            <use href="/icons.svg#header-separator" />
                        </svg>
                    </div>

                    <button type="button" className="company-switcher">
                        <span className="company-switcher__selected-name">
                            Romashka Digital
                        </span>
                        <span className="company-switcher__selected-info">
                            Tax ID 7714041000
                        </span>
                        <span className="dropdown-arrow">
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </button>

                </div>
                <div className="header__right-side">
                    <div className="current-mode">
                        Test mode
                    </div>
                    <div className="header__divider"></div>
                    <button type="button" className="search" aria-label="Search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <button type="button" className="notification" aria-label="Notifications">
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                    <div className="header__divider"></div>
                    <button type="button" className="profile">
                        <span className="profile__avatar placeholder"></span>
                        <span className="profile__name">
                            Ivan Petrov
                        </span>
                        <span className="profile__email">
                            ivan@romashka-digital.ru
                        </span>
                        <span className="dropdown-arrow">
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header;
