<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerGLryzOT\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerGLryzOT/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerGLryzOT.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerGLryzOT\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerGLryzOT\App_KernelDevDebugContainer([
    'container.build_hash' => 'GLryzOT',
    'container.build_id' => '8c3c5335',
    'container.build_time' => 1600080305,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerGLryzOT');
