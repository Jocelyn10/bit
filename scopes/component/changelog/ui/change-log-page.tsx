import { ComponentContext } from '@teambit/component';
import { H1 } from '@teambit/documenter.ui.heading';
import { Separator } from '@teambit/ui.separator';
import { VersionBlock } from '@teambit/ui.version-block';
import classNames from 'classnames';
import { useSnaps } from '@teambit/ui.hooks.use-snaps';
// import { MDXLayout } from '@teambit/ui.mdx-layout';
// import { ExportingComponents } from '@teambit/component.instructions.exporting-components';
import { AlertCard } from '@teambit/ui.alert-card';
import { EmptyBox } from '@teambit/ui.empty-box';
import React, { HTMLAttributes, useContext } from 'react';

import styles from './change-log-page.module.scss';

type ChangeLogPageProps = {} & HTMLAttributes<HTMLDivElement>;

export function ChangeLogPage({ className }: ChangeLogPageProps) {
  const component = useContext(ComponentContext);
  const { snaps, loading } = useSnaps(component.id);

  if (!snaps) return null;

  if (snaps.length === 0 && !loading) {
    return (
      <div className={classNames(styles.changeLogPage, className)}>
        <H1 className={styles.title}>History</H1>
        <Separator className={styles.separatorNoChangeLog} />
        <AlertCard
          level="info"
          title="There is no change log as this component has not been exported yet.
          Learn how to export components:"
        >
          <EmptyBox
            title="This component is new and doesn’t have a changelog yet."
            linkText="Learn more about component versioning"
            link="https://docs.bit.dev/docs/tag-component-version"
          />

          {/* <MDXLayout>
            <ExportingComponents />
          </MDXLayout> */}
        </AlertCard>
      </div>
    );
  }

  const latestVersion = snaps[0]?.tag || snaps[0]?.hash;

  return (
    <div className={classNames(styles.changeLogPage, className)}>
      <H1 className={styles.title}>History</H1>
      <Separator className={styles.separator} />
      {snaps.map((snap, index) => {
        const isLatest = latestVersion === snap.tag || latestVersion === snap.hash;
        return <VersionBlock key={index} componentId={component.id.fullName} isLatest={isLatest} snap={snap} />;
      })}
    </div>
  );
}
