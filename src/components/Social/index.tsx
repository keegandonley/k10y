import {
  githubGrey,
  githubGreyLight,
  instagramOrange,
  linkedInBlue,
  twitterBlue,
} from "@/theme/brandColors";
import styles from "./social.module.css";
import { URLS } from "./socials";
import { Icon } from "./Icon";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Social = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        <Icon icon={faTwitter} color={twitterBlue} url={URLS.twitter} />
        <Icon
          icon={faGithub}
          color={githubGrey}
          darkColor={githubGreyLight}
          url={URLS.github}
        />
        <Icon icon={faLinkedin} color={linkedInBlue} url={URLS.linkedIn} />
        <Icon icon={faInstagram} color={instagramOrange} url={URLS.instagram} />
      </div>
    </div>
  );
};
